import React, { useReducer } from "react";
import Board from "./Board";
import reducer from "./reducer";

const generateGrid = (rows, columns, mapper) => {
  return Array(rows)
    .fill()
    .map(() =>
      Array(columns)
        .fill()
        .map(mapper)
    );
};
const newTicTacToeGrid = () => generateGrid(3, 3, () => null);

const checkThree = (a, b, c) => {
  if (!a || !b || !c) return false;
  return a === b && b === c;
};

const flatten = arr => arr.reduce((acc, cur) => [...acc, ...cur], []);

const checkForWin = flattenGrid => {
  const [nw, n, ne, w, c, e, sw, s, se] = flattenGrid;
  return (
    checkThree(nw, n, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(nw, w, sw) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, c, se) ||
    checkThree(ne, c, sw)
  );
};

const checkForDraw = flattenGrid => {
  return (
    !checkForWin(flattenGrid) &&
    flattenGrid.filter(Boolean).length === flattenGrid.length
  );
};

const NEXT_TURN = {
  O: "X",
  X: "O"
};

const getInitialState = () => ({
  grid: newTicTacToeGrid(),
  status: "inProgress",
  turn: "X"
});

const Game = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const { grid, status, turn } = state;

  const handleClick = (x, y) => {
    dispatch({ type: "CLICK", payload: { x, y } });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="game">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Next turn: {turn}</div>
        <div>{status === "success" ? `${turn} won!` : null}</div>
        <button onClick={reset} type="button">
          Reset
        </button>
      </div>
      <Board grid={grid} onClick={handleClick} />
    </div>
  );
};

export default Game;
