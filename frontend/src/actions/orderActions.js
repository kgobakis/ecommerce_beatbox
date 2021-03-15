import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  console.log(order);
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    sessionStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
