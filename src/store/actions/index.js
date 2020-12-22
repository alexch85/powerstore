export {
   addToCart,
   addQtyMethod,
   addQuantity,
   addToCartMethod,
   removeFormCart,
   removeFromCartMethod,
   removeQtyMethod,
   removeQuantity,
   resetCounter,
   resetDeliveryMethod,
   IncrementQuantity,
   decrementQuantity,
   calcTotalItemQuantity,
   calcTotalWithDelivery,
   changeDeliveryMethod,
   updateTotalDelivery,
   resetCart,
   initProducts
} from './cartActions'

export {
   auth,
   authCheckState,
   switchMode,
   showLogin,
   closeLogin,
   showRegister,
   removeError,
   logout
} from './auth'

export {
   placeOrderOn,
   placeOrderOff
} from './orders'