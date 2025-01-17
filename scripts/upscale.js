/*
    image : file (Base64String)
    image_url : string
    image_id : string
    upscale_factor : integer |required| (2,4,6,8) default -> 2
    format : string ((JPG, PNG, WEBP) default -> JPG
*/
const { PicsartFetchHandler } = require('./picsartFetchHandler');
const { Cache } = require('./cache');

class Upscale {
    constructor(root) {
        this.upscale = new PicsartFetchHandler();
        this.cache = new Cache();
        this.url = 'https://api.picsart.io/tools/1.0/upscale';
        this.isActive = false;
        this.root = root;
        this.body = document.createElement('div');
        this.label = document.createElement('label');
        this.form = document.createElement('form');
        this.select = document.createElement('select');
        this.firstOption = document.createElement('option');
        this.secondOption = document.createElement('option');
        this.thirdOption = document.createElement('option');
        this.fourthOption = document.createElement('option');
        this.submitButton = document.createElement('button');
    }
    createStyles() {
        this.setBodyStyle();
        this.setFormStyle();
        this.setLabelStyle();
        this.setSelectStyle();
        this.setOptionStyle(this.firstOption, "2");
        this.setOptionStyle(this.secondOption, "4");
        this.setOptionStyle(this.thirdOption, "6");
        this.setOptionStyle(this.fourthOption, "8");
        this.setButtonStyle();
    }
    eventListenerAdder() {
        this.submitButton.addEventListener('click', () => {
            // this.select.value (2,4,6,8)
            
            const form = new FormData();
            form.append('upscale_factor', typeof(this.select.value) === 'undefined' ? "2" : this.select.value);
            form.append('format', 'JPG');

            const options = {
                method : 'POST',
                headers : {
                    accept : 'application/json',
                    'X-Picsart-API-Key': this.cache.getAuthKey(),
                },
            }
            
            this.upscale.fetchToPicsart(this.url, options, form);
        });
    }
    buildTree() {
        this.select.appendChild(this.firstOption);
        this.select.appendChild(this.secondOption);
        this.select.appendChild(this.thirdOption);
        this.select.appendChild(this.fourthOption);
        this.form.appendChild(this.label);
        this.form.appendChild(this.select);
        this.form.appendChild(this.submitButton);
        this.body.appendChild(this.form);
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
        this.body.style.display === "none"
    }
    setFormStyle() {
        
    }
    setLabelStyle() {
        this.label.textContent = "Choose a Upscale"
    }
    setSelectStyle() {
        
    }
    setOptionStyle(option, value) {
        option.textContent = value;
    }
    setButtonStyle() {
        this.submitButton.textContent = "Upscale";
        this.submitButton.style.color = "white";
        this.submitButton.style.backgroundColor = "black";
    }
};

module.exports = {Upscale};