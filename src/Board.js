import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
  createBoard(row, col) {
    const board = [];
    let counter = 0;

    for (let i = 0; i < row; i++) {
      const columns = [];
      for (let j = 0; j < col; j++) {
        columns.push(this.renderSquare(counter++));
      }
      board.push(
        <div key={i} className="row">
          {columns}
        </div>
      );
    }

    return board;
  }

  renderSquare(idx) {
    return (
      <Square
        key={idx}
        value={this.props.values[idx]}
        onClick={() => this.props.onClick(idx)}
      />
    );
  }

  render() {
    return <div>{this.createBoard(3, 3)}</div>;
  }
}

export default Board;
