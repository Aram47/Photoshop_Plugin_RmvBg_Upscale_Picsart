const { Cache } = require('./cache');

class Authorization {
    constructor(root) { // Login with Picsart (button name)
        this.cache = new Cache();
        // will be create button when its will clicked called cbAuthorizet
    }
    isAuthorizet() {
        return this.cache.getAuthKey() ? true : false; // temproary status is true
    }
    startAutorization(root, cbAuthorizet) {
        
    }
};

module.exports = {Authorization,};