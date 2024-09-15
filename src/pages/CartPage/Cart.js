import * as React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../APIpages/selectors";
import { CartFull } from "./CartFull.js";
import { CartEmpty } from "./CartEmpty.js";

export const Cart = () => {
  const cart = useSelector(selectCart);
  const goods = Object.values(cart);
  return <>{goods.length ? <CartFull goods={goods} /> : <CartEmpty />}</>;
};
