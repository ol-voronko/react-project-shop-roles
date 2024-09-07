// import { Button } from "@mui/material";
// import Card from "@mui/material/Card";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import * as React from "react";
// import { useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { selectCart } from "../../APIpages/selectors";
// import { endpoint } from "../Categories";
// import {
//   cartAdd,
//   cartSub,
//   cartDelete,
//   cartClear,
// } from "../../APIpages/reducers/cartReducer";
// import { actionFullOrder } from "../../Thunks/actionFullOrder.js";
import { CartFull } from "./CartFull.js";
import { CartEmpty } from "./CartEmpty.js";

export const Cart = () => {
  const cart = useSelector(selectCart);
  const goods = Object.values(cart);
  return <>{goods.length ? <CartFull goods={goods} /> : <CartEmpty />}</>;
};
