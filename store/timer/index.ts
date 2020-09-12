import * as types from './type';

// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
};

// TIMER REDUCER
const TimerReducer = (state = initialTimerState, { type, payload }) => {
  console.log('reducer', payload);
  switch (type) {
    case types.TICK:
      return {
        lastUpdate: payload.ts,
        light: !!payload.light,
      };
    default:
      return state;
  }
};
export default TimerReducer;
