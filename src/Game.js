import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: Array(9).fill(null),
      playerIsNext: true
    };
  }

  handleClick = idx => {
    const values = [...this.state.values];
    if (values[idx]) {
      return;
    }
    values[idx] = this.state.playerIsNext ? "X" : "O";
    this.setState({
      playerIsNext: !this.state.playerIsNext,
      values
    });
  };

  render() {
    return (
      <div className="game">
        <Board values={this.state.values} onClick={this.handleClick} />
      </div>
    );
  }
}

export default Game;
