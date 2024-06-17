import axios from 'axios';
import { base_url } from '../config';

// login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// signup
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// activation
export const ACTIVATE_ACCOUNT_REQUEST = 'ACTIVATE_ACCOUNT_REQUEST';
export const ACTIVATE_ACCOUNT_SUCCESS = 'ACTIVATE_ACCOUNT_SUCCESS';
export const ACTIVATE_ACCOUNT_FAILURE = 'ACTIVATE_ACCOUNT_FAILURE';

// Redux login actions
const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
  };
};

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${base_url}accounts/jwt/create/`, { email, password });
    const token = response.data.access;
    localStorage.setItem('token', token);
    // Dispatch login success action with the token
    dispatch(loginSuccess(token));
  } catch (error) {
    // Dispatch login failure action with the error message
    dispatch(loginFailure(error.message));
  }
};


// Redux actions for sign up

const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const signup = (email, username, password, re_password) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    await axios.post(`${base_url}accounts/users/`, { email, username, password, re_password });
    dispatch(signupSuccess());
  } catch (error) {
    dispatch(signupFailure(error.message));
    throw error; // Rethrow the error so it can be caught in the component
  }
};


// Redux activations actions
export const activateAccountRequest = () => ({
  type: ACTIVATE_ACCOUNT_REQUEST,
});

export const activateAccountSuccess = () => ({
  type: ACTIVATE_ACCOUNT_SUCCESS,
});

export const activateAccountFailure = (error) => ({
  type: ACTIVATE_ACCOUNT_FAILURE,
  payload: error,
});

// Thunk Action
export const activateAccount = (uid, token) => async (dispatch) => {
  dispatch(activateAccountRequest());
  try {
    const response = await axios.post(`${base_url}accounts/users/activation/`, { uid, token });
    dispatch(activateAccountSuccess());
  } catch (error) {
    const errorMsg = error.response && error.response.data ? error.response.data.detail : error.message;
    dispatch(activateAccountFailure(errorMsg));
  }
};