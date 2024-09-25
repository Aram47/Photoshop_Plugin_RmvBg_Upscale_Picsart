const photoshop = require('photoshop');
const uxp = require('uxp');
const localFileSystem = require('uxp').storage.localFileSystem;

async function createLayerFromArrayBuffer(arrayBuffer) {
    // Step 1: Convert ArrayBuffer to Uint8Array
    const uint8Array = new Uint8Array(arrayBuffer);

    // Step 2: Create a new temp file to store the image temporarily
    const tempFolder = await localFileSystem.getTemporaryFolder();
    let tempFile = null;
    await photoshop.core.executeAsModal(async () => {
        tempFile = await tempFolder.createFile("tempImage.jpg", { overwrite: true });
    })
    
    await tempFile.write(uint8Array);
    
    // Step 3: Open the temp image in Photoshop as a new document
    let newDoc = null;
    await photoshop.core.executeAsModal(async () => {
        newDoc = await photoshop.app.open(tempFile);
        console.log(newDoc);
        // Step 4: Select and copy the content from the opened temp document
        await newDoc.selection.selectAll();
        await newDoc.selection.copy();
        // Step 5: Close the temp document (without saving)
        newDoc.closeWithoutSaving();
    });
    
    
    // Step 6: Paste the copied content into the active document as a new layer
    await app.activeDocument.paste();
}


class RemoveBgFetchHandler {
    constructor() {
        this.tempFile = null;
        this.blob = null;
        this.fetchRes = null;
    }
    async saveCurrentDocumentWithoutDialog() {
        const activeDocument = photoshop.app.activeDocument;
    
        if (!activeDocument) {
            console.log("No active document found.");
            return;
        }
    
        try {
            const options = {
                format: "jpg",
                quality: 12,
                embedColorProfile: true,
            };
    
            // Access the folder where you want to save the file
            const tempImgFolder = await localFileSystem.getDataFolder();
    
            // Create or get the file entry for saving
            this.tempFile = await tempImgFolder.createFile("savedImage.jpg", { overwrite: true });
    
            // Save the active document as a JPEG without opening the dialog
            await photoshop.core.executeAsModal(async () => {
                await photoshop.app.activeDocument.saveAs.jpg(this.tempFile, options, true);
            });
    
            console.log("Document saved successfully.");
        } catch (error) {
            console.error("Error saving document:", error);
        }
    }

    async convertJpgToBlob() {
        try {
            // Read the file's binary content
            const arrayBuffer = await this.tempFile.read({ format: uxp.storage.formats.binary });
    
            // Convert the binary data into a Blob
            const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
    
            console.log("Blob created successfully.");
            return blob;
        } catch (error) {
            console.error("Error converting JPEG to Blob:", error);
        }
    }
    async fetchToPicsartAPI() {
        const form = new FormData();
        form.append('output_type', 'cutout');
        form.append('bg_blur', '0');
        form.append('scale', 'fit');
        form.append('auto_center', 'false');
        form.append('stroke_size', '0');
        form.append('stroke_color', 'FFFFFF');
        form.append('stroke_opacity', '100');
        form.append('shadow', 'disabled');
        form.append('shadow_opacity', '20');
        form.append('shadow_blur', '50');
        form.append('format', 'JPG');
        form.append('image', await this.blob.arrayBuffer());
    
        const options = {
            method : 'POST',
            headers : {
                accept : 'application/json',
                'X-Picsart-API-Key': 'eyJraWQiOiI5NzIxYmUzNi1iMjcwLTQ5ZDUtOTc1Ni05ZDU5N2M4NmIwNTEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhdXRoLXNlcnZpY2UtMWE2YWJjN2YtZjcyMS00NGRmLThmYWMtYjZkOGRhMDM5YTQzIiwiYXVkIjoiMjI3ODc3ODkwMDI4MTAyIiwibmJmIjoxNzI0MjMzNjY0LCJzY29wZSI6WyJiMmItYXBpLmdlbl9haSIsImIyYi1hcGkuaW1hZ2VfYXBpIl0sImlzcyI6Imh0dHBzOi8vYXBpLnBpY3NhcnQuY29tL3Rva2VuLXNlcnZpY2UiLCJvd25lcklkIjoiMjI3ODc3ODkwMDI4MTAyIiwiaWF0IjoxNzI0MjMzNjY0LCJqdGkiOiJkNzRjM2FhMS00ZTk3LTQ4MmEtYmIyOS1iMzcxY2Y1ZTFjYTUifQ.IlRiqhz6SEl2wF1pp0JDo7pkpGyht4k-9IV3GwY7B3YRjpfl-PCVwL-uHFGCtaEOJ33YEUGfsYZSIfZpPU01IrW-WQcosPtTSbnEEG_HYXOZZnk6T_o9YlUTOq-y2Y2Ca5o7w64fwMbdfPlZud0YGaxcxwrCI7G0nRlMrUhDDU56T1LA7g4yytFZNhbjT26P2Oe3gp7_ScNaMi0aegP-RUqmLZNPD6IRSmDS_6Xntw2n4riM-fDiJlT-krUdOqI8liUh-cWQvgmxeJz2ZYZfj_zEWKUdR4_yUqiOwGy3ospa27_1bh7MItBUoJ2argm0c1D0acRFbVxzRfQSzOFP6Q',
            },
        }
        options.body = form;
        try {
            this.fetchRes = await fetch('https://api.picsart.io/tools/1.0/removebg', options)
             .then((response) => response.json())
             .then((result) => fetch(result.data.url))
             .then((resBolob) => resBolob.blob())
             .then((arrBuffer) => {
                return arrBuffer.arrayBuffer();
             })
             .catch((err) => {
                console.log(`Error from catch: ${err}`);
             });
        } catch (err) {
            console.log(`Fetch request is failed: ${e}`);
        }
    }
    async toRemove() {
        await this.saveCurrentDocumentWithoutDialog();
        this.blob = await this.convertJpgToBlob();
        await this.fetchToPicsartAPI();
        await createLayerFromArrayBuffer(this.fetchRes).catch(e => console.log(e));
    }
};

module.exports = {RemoveBgFetchHandler,};