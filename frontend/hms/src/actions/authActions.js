// actions/authActions.js
import axios from 'axios';
import { base_url } from '../config';

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const ACTIVATE_ACCOUNT_REQUEST = 'ACTIVATE_ACCOUNT_REQUEST';
export const ACTIVATE_ACCOUNT_SUCCESS = 'ACTIVATE_ACCOUNT_SUCCESS';
export const ACTIVATE_ACCOUNT_FAILURE = 'ACTIVATE_ACCOUNT_FAILURE';

export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS';
export const USER_LOADED_FAIL = 'USER_LOADED_FAIL';

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
  localStorage.removeItem('user');
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
    dispatch(loginSuccess(token));
    await dispatch(loadUser(token)); // Call loadUser after successful login
  } catch (error) {
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
    throw error;
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

export const activateAccount = (uid, token) => async (dispatch) => {
  dispatch(activateAccountRequest());
  try {
    await axios.post(`${base_url}accounts/users/activation/`, { uid, token });
    dispatch(activateAccountSuccess());
  } catch (error) {
    const errorMsg = error.response && error.response.data ? error.response.data.detail : error.message;
    dispatch(activateAccountFailure(errorMsg));
  }
};

// Load user action
export const loadUser = (token) => async (dispatch) => {
  if (token) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    };

    try {
      const res = await axios.get(`${base_url}accounts/users/me/`, config);
      localStorage.setItem('user', JSON.stringify(res.data)); // Save user data to local storage
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};
