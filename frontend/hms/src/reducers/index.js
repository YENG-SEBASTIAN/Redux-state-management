
// rootReducer.js
import { combineReducers } from 'redux';
import { 
  loginReducer, 
  signupReducer, 
  activationReducer 
} from './authReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  activation: activationReducer,
});

export default rootReducer;