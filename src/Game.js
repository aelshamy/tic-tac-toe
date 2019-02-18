import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: Array(9).fill(null),
      playerIsNext: true
    };
  }

  calculateWinner(values) {
    const winingSquares = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winingSquares.length; i++) {
      const [a, b, c] = winingSquares[i];
      if (values[a] && values[a] === values[b] && values[a] === values[c]) {
        return values[a];
      }
    }
    return null;
  }

  handleClick = idx => {
    const values = [...this.state.values];
    if (this.calculateWinner(values) || values[idx]) {
      return;
    }
    values[idx] = this.state.playerIsNext ? "X" : "O";
    this.setState({
      playerIsNext: !this.state.playerIsNext,
      values
    });
  };

  resetGame = () => {
    this.setState({
      values: Array(9).fill(null),
      playerIsNext: true
    });
  };

  render() {
    const winner = this.calculateWinner(this.state.values);
    const playerIsWinner = winner && !this.state.playerIsNext;

    return (
      <div className="game">
        {winner ? (
          <div className="result">
            {playerIsWinner ? (
              <h3 className="winner">Good Job You won :)</h3>
            ) : (
              <h3 className="loser">Sorry, you did not make it this time :(</h3>
            )}

            <button onClick={this.resetGame}>Play Again</button>
          </div>
        ) : (
          <Board values={this.state.values} onClick={this.handleClick} />
        )}
      </div>
    );
  }
}

export default Game;
