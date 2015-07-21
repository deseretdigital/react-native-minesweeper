var React = require('react-native');
var Cell = require('./Cell');
var Scoreboard = require('./Scoreboard');
var styles = require('../styles.js');
var Actions = require('../actions.js');
var Store = require('../store.js');
var Reflux = require('reflux');

var {
  Text,
  TouchableHighlight,
  ScrollView,
  View,
} = React;

var Board = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return Store.getInitialState();
  },

  componentDidMount() {
    this.listenTo(Store, this.onStoreUpdate);
  },

  onStoreUpdate(newStoreState) {
    this.setState(newStoreState, () => {
      this.isGameOver()
    });
  },

  isGameOver() {
    let gameLost = this.isGameLost();
    let gameWon = !gameLost && this.didWeWin();

    let gameOver = false;
    if (gameLost || gameWon) {
      gameOver = true;
      Actions.stopTimer();
    }

    this.setState({
      gameOver,
      gameWon
    });
  },

  handleClickLocation(x, y) {
    if (this.state.gameOver) {
      return;
    }
    if (this.state.gameTimer === 0) {
      Actions.startTimer();
    }

    let cell = this.state.gameGrid[x][y];
    if (!cell.isFlagged) {
      Actions.sweepLocation(x, y);
    }
  },

  handleLongPressLocation(x, y) {
    if (this.state.gameOver) {
      return;
    }
    if (this.state.gameTimer === 0) {
      Actions.startTimer();
    }

    let cell = this.state.gameGrid[x][y];
    if (!cell.isSwept) {
      Actions.toggleFlag(x, y);
    }
  },

  isGameLost() {
    let { gameGrid } = this.state;

    for (let x = 0; x < gameGrid.length; ++x) {
      for (let y = 0; y < gameGrid[x].length; ++y) {
        if (gameGrid[x][y].isSwept && gameGrid[x][y].hasMine) {
          return true;
        }
      }
    }
    return false;
  },

  didWeWin() {
    let sweptSpaces = this.state.gameGrid.reduce((count, row) => {
      return count + row.reduce((initCount, cell) => {
        if (cell.isSwept) {
          initCount++;
        }
        return initCount;
      }, 0);
    }, 0);

    let totalSpaces = this.state.width * this.state.height;
    return sweptSpaces === totalSpaces - this.state.numMines;
  },

  renderRow(rowIndex) {
    let gameLost = this.state.gameOver && !this.state.gameWon;
    var cols = [];
    let { gameGrid } = this.state;
    for (let x = 0; x < gameGrid[rowIndex].length; ++x) {
      let mineCounts = gameGrid[rowIndex][x].mineCounts || '';

      let cellContents = mineCounts;
      if (gameGrid[rowIndex][x].hasMine) {
        cellContents = (gameLost) ? '💥' : '🔻';
      }
      cols.push((
        <Cell
          isSwept={this.state.gameOver || gameGrid[rowIndex][x].isSwept}
          isFlagged={gameGrid[rowIndex][x].isFlagged}
          clickHandler={(e) => this.handleClickLocation(rowIndex, x, e)}
          longPressHandler={(e) => this.handleLongPressLocation(rowIndex, x, e)}
          key={'cell_' + x}
        >
          <Text>{cellContents}</Text>
        </Cell>
      ));
    }

    return (
      <View style={styles.row} key={'row_' + rowIndex}>
        {cols}
      </View>
    );
  },

  render() {
    if (this.state.gameGrid === null) {
      return <View></View>;
    }

    let gameLost = this.state.gameOver && !this.state.gameWon;
    let statusMessage = (<Text>Have fun</Text>);

    if (gameLost) {
      statusMessage = (
        <Text>You lost!</Text>
      );
    } else if (this.state.gameWon) {
      statusMessage = (
        <Text>You won!</Text>
      );
    }

    let rows = [];
    for (let x = 0; x < this.state.gameGrid.length; ++x) {
      rows.push(this.renderRow(x));
    }

    let restartButton = <Text></Text>;
    if (this.state.gameOver) {
      restartButton = (
        <TouchableHighlight onPress={Actions.restartGame}>
        	<Text>New Game</Text>
        </TouchableHighlight>
      );
    }

    return (
      <View>
        <Scoreboard>
          {statusMessage}
        </Scoreboard>
        <ScrollView style={styles.board}>
          {rows}
        </ScrollView>
        {restartButton}
      </View>
    );
  }
});

module.exports = Board;
