/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var App = require('./components/App');
var styles = require('./styles');

var {
  AppRegistry,
  Text,
  View,
} = React;

var reactNativeMinesweeper = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <App />
      </View>
    );
  }
});

AppRegistry.registerComponent('reactNativeMinesweeper', () => reactNativeMinesweeper);
