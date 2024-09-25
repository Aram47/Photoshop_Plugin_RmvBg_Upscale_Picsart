const {Controller} = require('./scripts/controller');

function main() {
  const controller = new Controller(document.getElementById('root'));
  controller.startAction();
};

main();