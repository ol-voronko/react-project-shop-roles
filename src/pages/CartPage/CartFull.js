import { useDispatch } from "react-redux";
import { CardCart } from "./CardCart";
import { Button } from "@mui/material";
import { cartClear } from "../../APIpages/reducers/cartReducer";
import { actionFullOrder } from "../../Thunks/actionFullOrder";

export const CartFull = ({ goods }) => {
  const dispatch = useDispatch();

  const total = goods.reduce(
    (acc, { count, good: { price } }) => acc + count * price,
    0
  );

  const handleOrder = () => {
    dispatch(actionFullOrder());
    alert("Ваше замовлення прийнято в обробку.Дякуємо за покупку!");
  };
  return (
    <div className="cart-full">
      <h3>Ваше замовлення</h3>
      {goods.map(({ count, good }) => (
        <CardCart key={good._id} good={good} count={count} />
      ))}
      <p>До оплати без доставки: {total} грн</p>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: "error.light" }}
        onClick={() => dispatch(cartClear())}
      >
        Очистити кошик
      </Button>
      <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleOrder}>
        Оформити замовлення
      </Button>
    </div>
  );
};
