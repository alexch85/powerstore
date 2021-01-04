import * as actionTypes from '../actions/actionTypes';

const initialState = {
  products: null,
  // Available delivery methods
  deliveryMethods: [
    {
      method: 'flat rate shipping',
      description: 'Flat Rate Shipping(14-21 business days)',
      price: 39.99,
    },
    {
      method: 'regular usps shipping',
      description: 'USPS Shipping(7-12 business days)',
      price: 49.99,
    },
    {
      method: 'dhl express',
      description: 'DHL Express(1-3 business days)',
      price: 89.99,
    },
  ],

  delivery: {
    method: 'flat rate shipping',
    description: 'Flat Rate Shipping(14-21 business days)',
    price: 39.99,
  },

  cart: [],

  total: 0,

  totalWithDelivery: '',

  productPageQty: 1,

  totalItemQty: 0,

  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products,
        loading: false,
      };

    case actionTypes.REMOVE_PRODUCT:
      let productRemove = state.cart.find(
        (product, index) => index === action.id,
      );
      let newCart = state.cart.filter((product, index) => index !== action.id);
      let newTotal;
      if (state.total > 0) {
        newTotal = (
          state.total -
          productRemove.price * productRemove.qty
        ).toFixed(2);
        newTotal = parseFloat(newTotal);
      }
      return {
        ...state,
        cart: newCart,
        total: newTotal,
      };

    case actionTypes.ADD_TO_CART:
      let addedItem = state.products.find(
        (product) => product.name === action.id,
      );
      //Checks if product exsit in cart already
      let exsitedItem = state.cart.find((item) => item.name === action.id);

      //Exsiting item Multiple add  (from product page)
      if (exsitedItem && state.productPageQty >= 1) {
        exsitedItem.qty = exsitedItem.qty + state.productPageQty;
        let totalAddedPrice = parseFloat(
          (
            exsitedItem.totalAddedPrice +
            addedItem.price * state.productPageQty
          ).toFixed(2),
        );
        addedItem.totalAddedPrice = totalAddedPrice;
        let newTotal = (
          state.total +
          addedItem.price * state.productPageQty
        ).toFixed(2);
        newTotal = parseFloat(newTotal);
        return {
          ...state,
          total: newTotal,
        };
      }
      //Exsiting item single add (not from product page)
      if (exsitedItem) {
        addedItem.qty++;
        addedItem.totalAddedPrice = parseFloat(
          (addedItem.totalAddedPrice + addedItem.price).toFixed(2),
        );
        return {
          ...state,
          total: state.total + addedItem.price,
        };
      }
      //Mutliple item add to cart (from product page)
      if (state.productPageQty >= 1) {
        const productNum = state.productPageQty;
        addedItem.totalAddedPrice = parseFloat(
          (addedItem.price * productNum).toFixed(2),
        );
        addedItem.qty = productNum;
        const newTotal = parseFloat(
          (state.total + addedItem.price * addedItem.qty).toFixed(2),
        );
        return {
          ...state,
          cart: [...state.cart, addedItem],
          total: newTotal,
        };
      }
      // Not Existing item in cart add (not from product page)
      if (!exsitedItem) {
        addedItem.qty = 1;
        addedItem.totalAddedPrice = parseFloat(addedItem.price.toFixed(2));
        let newTotal = parseFloat((state.total + addedItem.price).toFixed(2));
        return {
          ...state,
          cart: [...state.cart, addedItem],
          total: newTotal,
        };
      }
      break;

    //Add random quantity of the same item to cart
    case actionTypes.ADD_QUANTITY:
      let item = state.cart.find((product) => product.name === action.id);
      item.qty++;
      item.totalAddedPrice = parseFloat(
        (item.totalAddedPrice + item.price).toFixed(2),
      );
      let updatedTotal = parseFloat((state.total + item.price).toFixed(2));
      return {
        ...state,
        total: updatedTotal,
      };

    //Remove random quantity of the same item from cart
    case actionTypes.REMOVE_QUANTITY:
      let cartItem = state.cart.find((product) => product.name === action.id);
      if (cartItem.qty === 1) {
        const updatedCart = state.cart.filter(
          (product) => product.name !== action.id,
        );
        let updatedTotal = parseFloat(
          (state.total - cartItem.price).toFixed(2),
        );
        cartItem.totalAddedPrice = parseFloat(
          (cartItem.totalAddedPrice - cartItem.price).toFixed(2),
        );
        return {
          ...state,
          cart: updatedCart,
          total: updatedTotal,
        };
      } else {
        cartItem.qty--;
        cartItem.totalAddedPrice = parseFloat(
          (cartItem.totalAddedPrice - cartItem.price).toFixed(2),
        );
        let updatedTotal = parseFloat(
          (state.total - cartItem.price).toFixed(2),
        );
        return {
          ...state,
          total: updatedTotal,
        };
      }

    //Increment item quantity in cart
    case actionTypes.INCREMENT_QUANTITY:
      let updateditemQty = state.productPageQty;
      updateditemQty++;
      return {
        ...state,
        productPageQty: updateditemQty,
      };

    //Decrement item quantity in cart
    case actionTypes.DECREMENT_QUANTITY:
      let updatedProductQty = state.productPageQty;
      if (updatedProductQty > 1) {
        updatedProductQty--;
      }
      return {
        ...state,
        productPageQty: updatedProductQty,
      };

    //Reset the quantity counter
    case actionTypes.RESET_COUNTER:
      return {
        ...state,
        productPageQty: 1,
      };

    //Calculate total items quantity in cart
    case actionTypes.CALC_TOTAL_ITEM_QTY:
      const totalItemQty = state.cart.reduce(function (prev, cur) {
        return prev + cur.qty;
      }, 0);
      return {
        ...state,
        totalItemQty: totalItemQty,
      };

    case actionTypes.CHANGE_DELIVERY_METHOD:
      const selectedMethod = state.deliveryMethods.filter(
        (method) => method.method === action.id,
      );
      const updatedMethod = selectedMethod[0];
      return {
        ...state,
        delivery: updatedMethod,
      };

    //Calculate total with delivery sum
    case actionTypes.CALC_TOTAL_WTH_DELIVERY:
      let newTotalWithDelivery = '';
      if (state.cart.length > 0) {
        newTotalWithDelivery = (state.total + state.delivery.price).toFixed(2);
        newTotalWithDelivery = parseFloat(newTotalWithDelivery);
      }

      return {
        ...state,
        totalWithDelivery: newTotalWithDelivery,
      };

    //Reset delivery method
    case actionTypes.RESET_DELIVERY_METHOD:
      return {
        ...state,
        delivery: {
          method: 'flat rate shipping',
          description: 'Flat Rate Shipping(14-21 business days)',
          price: 39.99,
        },
      };

    //Reset cart
    case actionTypes.RESET_CART:
      return {
        ...state,
        delivery: {
          method: 'flat rate shipping',
          description: 'Flat Rate Shipping(14-21 business days)',
          price: 39.99,
        },
        cart: [],
        total: 0,
        totalWithDelivery: '',
        productPageQty: 1,
        totalItemQty: 0,
      };

    default:
      return state;
  }
};

export default reducer;
