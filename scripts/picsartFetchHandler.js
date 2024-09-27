const photoshop = require('photoshop');
const uxp = require('uxp');
const localFileSystem = require('uxp').storage.localFileSystem;


class PicsartFetchHandler {
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
            return blob;
        } catch (error) {
            console.error("Error converting JPEG to Blob:", error);
        }
    }
    async fetchToPicsartAPI(url, options, form) {
        form.append('image', await this.blob.arrayBuffer());
        options.body = form;
        console.log(options);
        try {
            this.fetchRes = await fetch(url, options)
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
    async createLayerFromArrayBuffer(arrayBuffer) {
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
            // Step 4: Select and copy the content from the opened temp document
            await newDoc.selection.selectAll();
            
            await newDoc.selection.copy();
            // Step 5: Close the temp document (without saving)
            newDoc.closeWithoutSaving();
        });
        
        
        // Step 6: Paste the copied content into the active document as a new layer
        await app.activeDocument.paste();
    }
    async fetchToPicsart(url, options, form) {
        await this.saveCurrentDocumentWithoutDialog();
        this.blob = await this.convertJpgToBlob();
        await this.fetchToPicsartAPI(url, options, form);
        await this.createLayerFromArrayBuffer(this.fetchRes).catch(e => console.log(e));
    }
};

module.exports = {PicsartFetchHandler,};