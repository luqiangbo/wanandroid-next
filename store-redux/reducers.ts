import { combineReducers } from 'redux';

import counter from './counter';
import timer from './timer';
import outline from './outline';

const reducers = {
  counter,
  timer,
  outline,
};

export default combineReducers(reducers);
