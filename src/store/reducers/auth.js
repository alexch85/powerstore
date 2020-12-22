import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    loginMode : false,
    mode: 'login'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SWITCH_MODE:
            let mode = '';
            if (state.mode === 'login') {
                mode = 'register'
            } else  {
                mode = 'login'
            }
            return {
                ...state,
                mode: mode
            }

        case actionTypes.SHOW_LOGIN: 
            return {
                ...state,
                loginMode: true,
                mode:'login'
            }
        
        case actionTypes.SHOW_REGISTER:
            return { 
                ...state,
                loginMode: true,
                mode: 'register'
            }
        case actionTypes.CLOSE_LOGIN:
            return {
                ...state,
                loginMode: false,
                mode: 'login'
            }
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false,
            }
        case actionTypes.AUTH_FAIL:
            return {
                error: action.error,
                loading: false,
            }
        case actionTypes.REMOVE_ERROR:
            return {
                error: null
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                token: null,
                userId: null
            }
            default: return state
        }
    }

    export default reducer;