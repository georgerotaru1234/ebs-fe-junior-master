import {ActionConstants} from "redux/constants/constants"
export const setProductsAction = (products) => {
    return {
        type: ActionConstants.SET_PRODUCTS,
        payload: products
    }
}
export const addToCartAction = (id) => {
    return {
        type: ActionConstants.ADD_TO_CART,
        payload: id
    }
}
export const incrementQntAction = (id) => {
    return {
        type: ActionConstants.INCREMENT_QNT,
        payload: id
    }
}
export const decrementQntAction = (id) => {
    return {
        type: ActionConstants.DECREMENT_QNT,
        payload:id
    }
}
export const removeFromCartAction = (id) => {
    return {
        type: ActionConstants.REMOVE_FROM_CART,
        payload: id
    }
}
export const orderProductsAction = (value) => {
    return {
        type: ActionConstants.ORDER_BY_NAME,
        payload: value
    }
}
export const orderByPriceAction = (value) => {
    return {
        type: ActionConstants.ORDER_BY_PRICE,
        payload: value
    }
}
