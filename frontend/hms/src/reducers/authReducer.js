// reducers/authReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  ACTIVATE_ACCOUNT_REQUEST,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_FAILURE,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
} from '../actions/authActions';

// Initial states
const initialLoginState = {
  loading: false,
  token: null,
  error: null,
};

const initialSignupState = {
  loading: false,
  success: false,
  error: null,
};

const initialActivationState = {
  loading: false,
  activated: false,
  error: null,
};

const initialUserState = {
  loading: false,
  user: null,
  error: null,
};

const initialPasswordResetState = {
  loading: false,
  success: false,
  error: null,
};



// Reducers
export const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return initialLoginState;
    default:
      return state;
  }
};

export const signupReducer = (state = initialSignupState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const activationReducer = (state = initialActivationState, action) => {
  switch (action.type) {
    case ACTIVATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        activated: true,
        error: null,
      };
    case ACTIVATE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const passwordResetReducer = (state = initialPasswordResetState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };
    case PASSWORD_RESET_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        success: true, 
        error: null 
      };
    case PASSWORD_RESET_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    default:
      return state;
  }
};

// Combined reducer
export const authenticationReducer = (state = {}, action) => {
  return {
    login: loginReducer(state.login, action),
    signup: signupReducer(state.signup, action),
    activation: activationReducer(state.activation, action),
    user: userReducer(state.user, action),
    passwordReset: passwordResetReducer(state.passwordReset, action),
  };
};
