var React = require('react-native');
var Board = require('./Board');
var Reflux = require('reflux');
var Store = require('../store');
var Actions = require('../actions');

var {
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var App = React.createClass({
  mixins: [Reflux.connect(Store)],

  startNewGame() {
    let width = parseInt(this.refs.width.value);
    let height = this.refs.height.text;
    let numMines = parseInt(this.refs.numMines.value);
    console.log(height);

    Actions.startGame(width, height, numMines);
  },

  render() {
    if (!this.state.gameStarted) {
      return this.renderNewGameControls();
    } else {
      return this.renderBoard();
    }
  },

  renderNewGameControls() {
    return (
      <View>
        <Text>
          Width:
        </Text>
          <TextInput keyboardType="numeric" value={this.state.width} style={{width: 100, height:40}} ref="width" />
        <Text>
          Height:
        </Text>
          <TextInput keyboardType="numeric" value={this.state.height} style={{width: 100, height:40}} ref="height" />


          <Text>Num Mines:</Text>
          <TextInput keyboardType="numeric" value={this.state.numMines} style={{width: 100, height:40}} ref="numMines" />

        <TouchableHighlight onPress={this.startNewGame}>
        	<Text>Start</Text>
        </TouchableHighlight>
      </View>
    );
  },

  renderBoard() {
    return (
      <View>
        <Board />
      </View>
    );
  }
});

module.exports = App;
