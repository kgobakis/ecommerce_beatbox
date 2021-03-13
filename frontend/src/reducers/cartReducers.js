import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);
      console.log(existItem);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => {
            if (x.product === existItem.product) {
              return item;
            } else {
              return x;
            }
          }),
        };
      } else {
        console.log("adding item for first time : ", item);
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    default:
      return state;
  }
};
