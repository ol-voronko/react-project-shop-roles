import { api } from "../APIpages/api";
import { cartSlice } from "../APIpages/reducers/cartReducer";
import { cartClear } from "../APIpages/reducers/cartReducer";
import { useSelector } from "react-redux";
import { selectCart } from "../APIpages/selectors";

export const actionFullOrder = () => async (dispatch, getState) => {
  const cart = getState().cartPage.cart;
  const order = {};
  order.orderGoods = Object.values(cart).map(({ count, good: { _id } }) => ({
    count,
    good: { _id },
  }));
  try {
    await dispatch(api.endpoints.newOrder.initiate({ order }));
    dispatch(cartClear());
    // alert("Замовлення прийнято в обробку");
  } catch {
    console.log("The order could not be completed");
  }
};
