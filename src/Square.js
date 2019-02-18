import PropTypes from "prop-types";
import React from "react";

const Square = props => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

export default Square;
