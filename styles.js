var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
	board: {
   width: 340,
   height: 340,
	},
	row: {
		flexDirection: 'row'
	},
	cell: {
		backgroundColor: 'gainsboro',
    flex: 1,
    height: 24,
    width: 24,
    margin: 1,
	},
	sweptCell: {
		backgroundColor: 'gainsboro',
    flex: 1,
    height: 24,
    width: 24,
    margin: 1,
		backgroundColor: 'sandybrown'
	}
});

module.exports = styles;
