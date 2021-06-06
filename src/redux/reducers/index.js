import { combineReducers } from "redux";
import productsReducer from "./reducers";

const reducers = combineReducers({
    products: productsReducer,
});

export default reducers;
