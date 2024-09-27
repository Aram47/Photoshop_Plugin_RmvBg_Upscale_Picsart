const {Authorization} = require('./authorization');
const {Onboarding} = require('./onboarding');
const {Board} = require('./board');

class Controller {
    constructor(root) {
        this.root = root;
        this.buttonToAuth = document.createElement('button');
        this.authorization = new Authorization(this.root);
        this.onboarding = new Onboarding(this.root);
        this.board = new Board(this.root);
    }
    createStyles() {
        this.buttonToAuth.textContent = "Authorize with Picsart";
    }
    eventListenerAdder() {
        this.buttonToAuth.addEventListener('click', () => {
            // this code will be inside the function fetch when we will have backend API
            if (this.authorization.isAuthorizet()) {
                this.buttonToAuth.style.display = "none";
                this.onboarding.show(() => {
                    this.board.show();
                });
            } else {
                this.authorization.startAutorization(this.root, () => {
                    this.startAction();
                });
            }
        });
    }
    buildTree() {
        this.root.appendChild(this.buttonToAuth);
    }
    startAction() {
        this.createStyles();
        this.eventListenerAdder();
        this.buildTree();
    }
};

module.exports = {Controller,};