

import { combineReducers } from 'redux';
import counter from './counter'
import authReducer from './authReducer';

export default combineReducers({
  counter,
  auth: authReducer,
});
