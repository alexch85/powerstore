import * as actionTypes from './actionTypes';
import axios from 'axios';

const firebaseKey = process.env.REACT_APP_POWERSTORE_FIREBASE_KEY;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, mode) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    //Sign in with password
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`;
    //Register user
    if (mode === 'register') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key==${firebaseKey}`;
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          //Token will expire within an hour
          new Date().getTime() + response.data.expiresIn * 1000,
        );
        //Setting items to local storage
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        alert('Something went wrong on login');
        dispatch(authFail(err.response.data.error));
      });
  };
};

//Check auth items in local storage for auto sign up on refresh
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationDate'));
      //Compare expiration time with current time
      if (expirationTime <= new Date()) {
        dispatch(logout());
      } else {
        //Get userId from local storage
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId, 'login'));
        dispatch(
          checkAuthTimeout(
            //Subtract current time from expiration time
            (expirationTime.getTime() - new Date().getTime()) / 1000,
          ),
        );
      }
    }
  };
};

export const switchMode = () => {
  return {
    type: actionTypes.SWITCH_MODE,
  };
};

export const showLogin = () => {
  return {
    type: actionTypes.SHOW_LOGIN,
  };
};

export const closeLogin = () => {
  return {
    type: actionTypes.CLOSE_LOGIN,
  };
};

export const showRegister = () => {
  return {
    type: actionTypes.SHOW_REGISTER,
  };
};

export const removeError = () => {
  return {
    type: actionTypes.REMOVE_ERROR,
  };
};
