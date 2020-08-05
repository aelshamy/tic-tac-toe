import React from "react";
import Square from "./Square";

const Grid = ({ grid, onClick }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <Square
              key={`${columnIndex}-${rowIndex}`}
              value={value}
              onClick={() => onClick(columnIndex, rowIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
