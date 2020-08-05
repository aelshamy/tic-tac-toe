import React from "react";

const Square = ({ value, onClick }) => (
  <div className="square">
    <button
      style={{
        width: "100%",
        height: "100%"
      }}
      onClick={onClick}
      type="button"
    >
      {value}
    </button>
  </div>
);

export default Square;
