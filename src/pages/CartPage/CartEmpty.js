import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { CartIcon } from "./CartIcon";

export const CartEmpty = () => {
  return (
    <div className="cart">
      <CartIcon />
      <span> кошик порожній</span>
      <p>Подивись наш каталог, обов'язково щось знайдеш.</p>

      <Link to="/">
        <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
          За покупками
        </Button>
      </Link>
    </div>
  );
};
