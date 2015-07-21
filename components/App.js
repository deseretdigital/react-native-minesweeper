var React = require('react-native');
var Board = require('./Board');
var Reflux = require('reflux');
var Store = require('../store')
var Actions = require('../actions');

var {
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var App = React.createClass({
	mixins: [Reflux.ListenerMixin],

	componentDidMount() {
		this.listenTo(Store, this.updateGameStarted);
	},

	getInitialState() {
		return {
			height: 10,
			width: 10,
			numMines: 5,
			gameStarted: false
		}
	},

	updateGameStarted(newState) {
		this.setState({gameStarted: newState.gameStarted});
	},

  startNewGame() {
    Actions.startGame(
    	this.state.width,
    	this.state.height,
    	this.state.numMines
    );
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
        <TextInput keyboardType="numeric" value={this.state.width.toString()} style={{width: 100, height:40}} onChangeText={ (width) => this.setState({width}) } />

        <Text>
          Height:
        </Text>
        <TextInput keyboardType="numeric" value={this.state.height.toString()} style={{width: 100, height:40}} onChangeText={ (height) => this.setState({height}) } />


        <Text>Num Mines:</Text>
        <TextInput keyboardType="numeric" value={this.state.numMines.toString()} style={{width: 100, height:40}} onChangeText={ (numMines) => this.setState({numMines}) } />

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
