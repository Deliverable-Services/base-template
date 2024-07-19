import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import users from '../reducer/userSlice';

const combinedReducer = combineReducers({
  users,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    // Make sure to merge server state and client state
    // We don't want to replace all the state
    // Since server state doesn't container update client state data
    const nextState = {
      ...state,
      //if we need to add server side state the define here
    };

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const initializeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const wrapper = createWrapper(initializeStore);
