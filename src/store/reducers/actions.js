import * as types from "./types";

export const save_cords_AC = (data) => ({
  type: types.SET_COORDS,
  payload: data,
});
