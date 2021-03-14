import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducer";

const initialState = {
  userSignin: {
    userInfo: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: sessionStorage.getItem("cartItems")
      ? JSON.parse(sessionStorage.getItem("cartItems"))
      : [],
    shippingAddress: sessionStorage.getItem("shippingAddress")
      ? JSON.parse(sessionStorage.getItem("shippingAddress"))
      : {},
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
