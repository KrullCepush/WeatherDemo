import * as types from "./types";
import initialState from "./initialState";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_COORDS: {
      return { ...state, currentPossition: action.payload };
    }

    default:
      return state;
  }
}
