import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { cartAdd } from "../../APIpages/reducers/cartReducer";
import { endpoint } from "../Categories";

export const CardGood = ({ good }) => {
  const dispatch = useDispatch();
  const { name, images, price, _id } = good;
  return (
    <Card
      sx={{
        width: "35%",
        height: "75%",
        boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
      }}
    >
      <CardActionArea>
        <div style={{ height: "75%", marginTop: "5vh" }}>
          <CardMedia
            component="img"
            style={{ width: "50%", aspectRatio: "1.2", margin: "auto" }}
            image={
              images.length && images[0].url
                ? endpoint + images[0].url
                : "../images/box.jpg"
            }
            alt={name}
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/good/${_id}`}>{name}</Link>
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {price} грн
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          color="primary"
          sx={{ marginRight: "5vw", fontSize: "1rem", fontWeight: "500" }}
          onClick={() => dispatch(cartAdd(good))}
        >
          У кошик
        </Button>
      </CardActions>
    </Card>
  );
};
