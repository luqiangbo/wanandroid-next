import * as types from './type';

export const setMenuCurrent = (payload) => (dispatch) =>
  dispatch({
    type: types.OUTLINE_TICK,
    payload,
  });
export const setUserInfo = (payload) => (dispatch) =>
  dispatch({
    type: types.USER_INFO,
    payload,
  });
export const setIsLogin = (payload) => (dispatch) =>
  dispatch({
    type: types.IS_LOGIN,
    payload,
  });
