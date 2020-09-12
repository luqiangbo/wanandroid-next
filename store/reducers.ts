import { combineReducers } from 'redux';

import counter from './counter';
import timer from './timer';

const reducers = {
  counter,
  timer,
};

export default combineReducers(reducers);
