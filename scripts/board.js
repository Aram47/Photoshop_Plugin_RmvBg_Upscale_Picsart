const {RemoveBg} = require('./removeBg');
const {Upscale} = require('./upscale');

class Board {
    constructor(root) {
        this.root = root;
        this.head = document.createElement('div');
        this.removeBgBoard = document.createElement('div');
        this.upscaleBoard = document.createElement('div');
        this.removeBgButton = document.createElement('button');
        this.upscaleButton = document.createElement('button');
        this.removeBg = new RemoveBg(this.root);
        this.upscale = new Upscale(this.root);
    }
    createStyles() {
        this.setHeadStyle();
        this.setBoardStyle(this.removeBgBoard);
        this.setBoardStyle(this.upscaleBoard);
        this.setButtonStyle(this.removeBgButton, "Remove");
        this.setButtonStyle(this.upscaleButton, "Upscale");
    }
    eventListenerAdder() {
        this.removeBgButton.addEventListener('click', () => {
            if (this.upscale.isActive) {
                this.upscale.stopAction();
                this.removeBg.show();
            }
        });
        this.upscaleButton.addEventListener('click', () => {
            if (this.removeBg.isActive) {
                this.removeBg.stopAction();
                this.upscale.show();
            }
        });
    }
    buildTree() {
        this.removeBgBoard.appendChild(this.removeBgButton);
        this.upscaleBoard.appendChild(this.upscaleButton);
        this.head.appendChild(this.removeBgBoard);
        this.head.appendChild(this.upscaleBoard);
        this.root.appendChild(this.head);
    }
    show() {
        this.createStyles();
        this.eventListenerAdder();
        this.buildTree();
        this.removeBg.show();
    }
    setHeadStyle() {
        this.head.style.display = "flex";
    }
    setBoardStyle(board) {

    }
    setButtonStyle(button, value) {
        button.textContent = value;
        button.style.color = "white";
        button.style.backgroundColor = "black";
    }
};

module.exports = {Board,};