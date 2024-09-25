const {app, core} = require('photoshop');

class UpscaleFetchHandler {
    constructor() {
        this.layers = app.activeDocument.layers;
    }
    toUpscale(upscale) { // argument is string (2,4,6,8)
        
    }
};

module.exports = {UpscaleFetchHandler,};