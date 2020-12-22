import * as actionTypes from './actionTypes';
import axios from 'axios'


export const addToCart = (id) => {
    return {
        type: actionTypes.ADD_TO_CART,
        id
    }
}
export const removeFormCart = (id) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        id
    }
}
export const addQuantity = (id) => {
    return {
        type: actionTypes.ADD_QUANTITY,
        id
    }
}
export const removeQuantity = (id) => {
    return {
        type: actionTypes.REMOVE_QUANTITY,
        id
    }
}
export const IncrementQuantity = () => {
    return {
        type: actionTypes.INCREMENT_QUANTITY,
        
    }
}
export const decrementQuantity = () => {
    return {
        type: actionTypes.DECREMENT_QUANTITY,
        
    }
}
export const resetCounter = () => {
    return {
        type: actionTypes.RESET_COUNTER,
        
    }
}
export const calcTotalItemQuantity = () => {
    return {
        type: actionTypes.CALC_TOTAL_ITEM_QTY,
    }
}

export const changeDeliveryMethod = (id) => {
    return {
        type: actionTypes.CHANGE_DELEVERY_METHOD,
        id
    }
}
export const calcTotalWithDelivery = () => {
    return {
        type: actionTypes.CALC_TOTAL_WTH_DELIVERY,
    }
}

export const resetDeliveryMethod = () => {
    return {
        type: actionTypes.RESET_DELEVERY_METHOD,
    }
}

export const resetCart = () => {
    return {
        type: actionTypes.RESET_CART,
    }
}

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    }
}

export const fetchProductsFail = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL
    }
}

export const fetchProductsSuccess = ( products ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: products
    };
};

export const initProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart())
        axios.get('https://react-powerstore-alex.firebaseio.com/products.json')
            .then( res => {
                const fetchedProducts = []
                for ( let key in res.data ) {
                    fetchedProducts.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchProductsSuccess(fetchedProducts))
            })
            .catch(err => {
                dispatch(fetchProductsFail(err))
            })
    }
}


export const updateTotalDelivery = (id) => {
    return dispatch => {
        dispatch(changeDeliveryMethod(id))
        dispatch(calcTotalWithDelivery())
    }
} 


export const addToCartMethod = (id) => {
    return dispatch => { 
        dispatch(addToCart(id))
        dispatch(calcTotalItemQuantity())
        dispatch(calcTotalWithDelivery())
    }
}
export const removeFromCartMethod = (id) => {
    return dispatch => { 
        dispatch(removeFormCart(id))
        dispatch(calcTotalItemQuantity())
        dispatch(calcTotalWithDelivery())
    }
}
export const addQtyMethod = (id) => {
    return dispatch => { 
        dispatch(addQuantity(id))
        dispatch(calcTotalItemQuantity())
        dispatch(calcTotalWithDelivery())
    }
}
export const removeQtyMethod = (id) => {
    return dispatch => { 
        dispatch(removeQuantity(id))
        dispatch(calcTotalItemQuantity())
        dispatch(calcTotalWithDelivery())
    }
}