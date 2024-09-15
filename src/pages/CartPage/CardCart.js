import { Card, Typography, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  cartSub,
  cartAdd,
  cartDelete,
} from "../../APIpages/reducers/cartReducer";
import { BACKEND_HOSTNAME } from "../../APIpages/api";

export const CardCart = ({ count, good }) => {
  const dispatch = useDispatch();

  const { name, price, images, _id } = good;

  return (
    <>
      <div className="card-cart">
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
            width: "75vw",
          }}
        >
          <div className="cart-img">
            <img
              src={
                images?.length > 0 && images[0].url
                  ? `http://${BACKEND_HOSTNAME}/${images[0].url}`
                  : "../images/box.jpg"
              }
              height={200}
              width={"100%"}
              alt={name}
            />
          </div>
          <div className="cart-description">
            <Typography gutterBottom variant="h5" component="div">
              <Link to={`/good/${_id}`}>{name}</Link>
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {price} грн
            </Typography>
            <div className="cart-buttons">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#42a5f5",
                  fontSize: "calc(16px + 2vmin)",
                }}
                style={{ padding: "0" }}
                onClick={() => dispatch(cartSub(good))}
                disabled={count <= 1}
              >
                -
              </Button>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{
                  width: "4vw",
                  marginLeft: "1vw",
                  marginRight: "1vw",
                  fontSize: "calc(12px + 2vmin)",
                }}
                value={count}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#42a5f5",
                  fontSize: "calc(16px + 2vmin)",
                }}
                style={{ padding: "0" }}
                onClick={() => dispatch(cartAdd(good))}
              >
                +
              </Button>
            </div>
          </div>
          <div className="cart-result">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => dispatch(cartDelete(good))}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="h5" color="text.secondary">
              {price * count} грн
            </Typography>
          </div>
        </Card>
      </div>
    </>
  );
};
