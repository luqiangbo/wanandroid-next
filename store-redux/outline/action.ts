import * as types from './type';

export const setMenuCurrent = (payload) => (dispatch) =>
  dispatch({
    type: types.OUTLINE_TICK,
    payload,
  });
