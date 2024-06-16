import axios from 'axios';
import { base_url } from '../config';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

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
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginFailure(error.detail));
  }
};
