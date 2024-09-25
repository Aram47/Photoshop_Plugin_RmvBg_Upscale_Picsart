const {Authorization} = require('./authorization');
const {Onboarding} = require('./onboarding');
const {Board} = require('./board');

class Controller {
    constructor(root) {
        this.root = root;
        this.authorization = new Authorization(this.root);
        this.onboarding = new Onboarding(this.root);
        this.board = new Board(this.root);
    }
    startAction() {
        if (this.authorization.isAuthorizet()) {
            this.onboarding.show(() => {
                this.board.show();
            });
        } else {
            this.authorization.startAutorization(this.root, () => {
                this.startAction();
            });
        }
    }
};

module.exports = {Controller,};