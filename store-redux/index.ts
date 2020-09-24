import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';

// 持久化
const persistConfig = {
  key: 'beijing',
  storage: storage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // https://github.com/rt2zz/redux-persist/issues/786
  timeout: null,
};
const persistedReducer = persistReducer(persistConfig, reducers);
//

let store;

function initStore(initialState) {
  return createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export const initializeStoreRedux = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStoreRedux(initialState) {
  const store = useMemo(() => initializeStoreRedux(initialState), [initialState]);
  return store;
}
