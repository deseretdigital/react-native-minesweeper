var React = require('react-native');
var styles = require('../styles.js');

var {
  Text,
  TouchableHighlight,
  View,
} = React;

var Cell = React.createClass({
  propTypes: {
    isSwept: React.PropTypes.bool,
    isFlagged: React.PropTypes.bool,
    children: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      isSwept: false,
      isFlagged: false,
    }
  },

  render() {
    let cellStyle = (this.props.isSwept) ?
    styles.sweptCell :
    styles.cell;

    let content = '';
    if (this.props.isSwept) {
      content = this.props.children;
    } else if (this.props.isFlagged) {
      content = '🇺🇸';
    }

    return (
      <TouchableHighlight
        style={cellStyle}
        onPress={this.props.clickHandler.bind(null)}
      >
        <Text>{content}</Text>
      </TouchableHighlight>
    );
  }
});

module.exports = Cell;
