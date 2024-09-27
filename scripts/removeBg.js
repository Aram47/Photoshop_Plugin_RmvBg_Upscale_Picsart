/*
    image : file (Base64String)                                         // -
    image_url : string                                                  // -
    image_id : string                                                   // -
    output_type : string (cutout, mask) default -> cutout               // +
    bg_image : file | null (Base64String)                               // -
    bg_image_url : string | null                                        // -
    bg_image_id : string | null                                         // -
    bg_color : string | null                                            // -
    bg_blur : integer (0 to 100) default -> 0                           // -
    bg_width : integer                                                  // -
    bg_height : integer                                                 // -
    scale : string (fit, fill) default -> fit                           // -
    auto_center : boolean (false, true) default -> false                // -
    stroke_size : integer | null (0 to 100) default 100                 // -
    stroke_color : string | null (hexadecimal) default -> FFFFFF        // -
    stroke_opacity : integer | null (0 to 100) default -> 100           // -
    format : string (PNG, JPG, WEBP) default -> PNG                     // -
*/
const { PicsartFetchHandler } = require('./picsartFetchHandler');
const { Cache } = require('./cache');

class RemoveBg {
    constructor(root) {
        this.removeBg = new PicsartFetchHandler();
        this.cache = new Cache();
        this.url = 'https://api.picsart.io/tools/1.0/removebg';
        this.isActive = true;
        this.root = root;
        this.body = document.createElement('div');
        this.removeButton = document.createElement('button');
    }
    createStyles() {
        this.setBodyStyle();
        this.setRemoveButtonStyle();
    }
    eventListenerAdder() {
        this.removeButton.addEventListener('click', () => {
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
        
            const options = {
                method : 'POST',
                headers : {
                    accept : 'application/json',
                    'X-Picsart-API-Key': this.cache.getAuthKey(),
                },
            }
            
            this.removeBg.fetchToPicsart(this.url, options, form);
        });
    }
    buildTree() {
        this.body.appendChild(this.removeButton);
        this.root.appendChild(this.body);
    }
    show() {
        this.isActive = true;
        if (this.body.style.display === "none") {
            this.body.style.display = "block";
            return;
        }
        this.createStyles();
        this.eventListenerAdder();
        this.buildTree();
    }
    stopAction() {
        this.isActive = false;
        this.body.style.display = "none";
    }
    setBodyStyle() {

    }
    setRemoveButtonStyle() {
        this.removeButton.textContent = "Remove Background";
        this.removeButton.style.color = "white";
        this.removeButton.style.backgroundColor = "black";
    }
};

module.exports = {RemoveBg,};