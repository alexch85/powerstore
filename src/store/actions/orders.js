import * as actionTypes from './actionTypes';

export const placeOrderOn = () => {
    return {
        type : actionTypes.PLACE_ORDER_ON
    }
}

export const placeOrderOff = () => {
    return {
        type : actionTypes.PLACE_ORDER_OFF
    }
}