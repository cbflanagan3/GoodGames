import TYPES from "./types";

const gameReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.GET_GAMES:
      return action.games ? [...action.games] : [];
    case TYPES.SET_GAMES:
        return action.games;
    default:
      return state;
  }
};

export default gameReducer;