import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orderPlaced: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Order placed shows message modal
    case actionTypes.PLACE_ORDER_ON:
      return {
        ...state,
        orderPlaced: true,
      };

    //Closes the modal
    case actionTypes.PLACE_ORDER_OFF:
      return {
        ...state,
        orderPlaced: false,
      };

    default:
      return state;
  }
};

export default reducer;
