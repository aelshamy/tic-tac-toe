const reducer = (state, action) => {
  if (state.status == "success" && action.type != "RESET") {
    return state;
  }
  switch (action.type) {
    case "RESET":
      return getInitialState();

    case "CLICK":
      const { x, y } = action.payload;
      const { turn } = state;

      if (state.grid[y][x]) {
        return state;
      }
      const nextState = { ...state };
      nextState.grid[y][x] = turn;

      const flattenGrid = flatten(nextState.grid);

      if (checkForWin(flattenGrid)) {
        nextState.status = "success";
        return nextState;
      }

      if (checkForDraw(flattenGrid)) {
        return getInitialState();
      }

      nextState.turn = NEXT_TURN[turn];

      return nextState;

    default:
      return state;
  }
};

export default reducer;
