import React from "react";
import Grid from "./Grid";

const Board = ({ grid, onClick }) => {
  return (
    <div>
      <Grid grid={grid} onClick={onClick} />
    </div>
  );
};

export default Board;
