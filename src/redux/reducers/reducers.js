import {ActionConstants} from '../constants/constants';
const initialState = {
  products: [],
  orderType: false,
  orderByPrice: false,
};
const productsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionConstants.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionConstants.ADD_TO_CART:
      return {
        ...state,
        products: state.products.map((item) => (item.id === payload ? { ...item, quantity: 1 } : item)),
      };
    case ActionConstants.ORDER_BY_NAME:
      return {
        ...state,
        products: state.products && payload ? state.products.slice().sort((a, b) => {
          if (a.category.name < b.category.name) {
            return -1;
          }
          if (a.category.name > b.category.name) {
            return 1;
          }
          return 0;
        }) : state.products,
        orderType: payload
      }
    case ActionConstants.ORDER_BY_PRICE:
      return {
        ...state,
        products: payload
          ? state.products.slice().sort((a, b) => a.price - b.price)
          : state.products.slice().sort((a, b) => b.price - a.price),
        orderByPrice: payload,
      };
    case ActionConstants.INCREMENT_QNT:
      return {
        ...state,
        products: state.products.map((item) => (item.id === payload ? { ...item, quantity: item.quantity + 1 } : item)),
      };
    case ActionConstants.DECREMENT_QNT:
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === payload ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity } : item,
        ),
      };
    case ActionConstants.REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.map((item) => (item.id === payload ? { ...item, quantity: 0 } : item)),
      };
    default:
      return state;
  }
};
export default productsReducer;
