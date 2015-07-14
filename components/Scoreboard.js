var React = require('react-native');
var Store = require('../store.js');
var Reflux = require('reflux');

var {
	Text,
	View
} = React;

var Scoreboard = React.createClass({
  mixins: [Reflux.connect(Store)],

  render() {
    return (
      <View>
        <Text>{this.props.children}</Text>
        <Text>flags left: {this.state.numRemainingFlags}</Text>
        <Text>Seconds ticked: {this.state.gameTimer}</Text>
      </View>
    );
  }
});

module.exports = Scoreboard;
