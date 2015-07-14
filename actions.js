var Reflux  = require('reflux');

let actions = Reflux.createActions([
  'startGame',
  'sweepLocation',
  'toggleFlag',
  'restartGame',
  'startTimer',
  'stopTimer'
]);

module.exports = actions;
