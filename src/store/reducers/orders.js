import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orderPlaced: false,
}

const reducer = (state = initialState,  action) => {
    switch (action.type) {
        case actionTypes.PLACE_ORDER_ON :
            return {
                ...state,
                orderPlaced : true
            }

        case actionTypes.PLACE_ORDER_OFF :
            return {
                ...state,
                orderPlaced : false
            }

        default: return state;
    }

}

export default reducer