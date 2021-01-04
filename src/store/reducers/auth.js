import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  loginMode: false,
  mode: 'login',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Switch between login and register modal
    case actionTypes.SWITCH_MODE:
      let mode = '';
      if (state.mode === 'login') {
        mode = 'register';
      } else {
        mode = 'login';
      }
      return {
        ...state,
        mode: mode,
      };

    //Shows login modal
    case actionTypes.SHOW_LOGIN:
      return {
        ...state,
        loginMode: true,
        mode: 'login',
      };

    //Shows register modal
    case actionTypes.SHOW_REGISTER:
      return {
        ...state,
        loginMode: true,
        mode: 'register',
      };

    //Closes login/register modal
    case actionTypes.CLOSE_LOGIN:
      return {
        ...state,
        loginMode: false,
        mode: 'login',
      };

    //Authentication start
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };

    //Authentication success
    case actionTypes.AUTH_SUCCESS:
      return {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };

    //Authentication fail
    case actionTypes.AUTH_FAIL:
      return {
        error: action.error,
        loading: false,
      };

    //Remove authentication error
    case actionTypes.REMOVE_ERROR:
      return {
        error: null,
      };

    //Logout user
    case actionTypes.AUTH_LOGOUT:
      return {
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default reducer;
