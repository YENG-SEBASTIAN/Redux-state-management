
// rootReducer.js
import { combineReducers } from 'redux';
import {authenticationReducer} from './authReducer';


const rootReducer = combineReducers({
  auth: authenticationReducer,
});

export default rootReducer;