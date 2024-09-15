import { useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { endpoint } from "./Categories";
import {
  Button,
  CardActions,
  IconButton,
  Card,
  Typography,
  CardMedia,
  CardContent,
} from "@mui/material";
import { api } from "../../APIpages/api";
import { cartAdd } from "../../APIpages/reducers/cartReducer";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Carousel } from "./Carousel";

const { useGetGoodByIdQuery } = api;

export const PageGood = () => {
  const dispatch = useDispatch();

  const { _id } = useParams();
  const { isLoading, data } = useGetGoodByIdQuery({ _id });
  console.log(isLoading, data, _id);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  const {
    GoodFindOne: { name, description, images, price, categories },
  } = data;

  return (
    <div className="category-all">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
        }}
      >
        <IconButton
          component={Link}
          to={`/category/${categories[0]._id}`}
          aria-label="delete"
          size="large"
          sx={{ alignSelf: "flex-end" }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <CardMedia
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5vh",
            justifyContent: "space-between",
            // height: "50%",
            marginTop: "5vh",
          }}
        >
          <Carousel images={images} />
        </CardMedia>
        <CardContent sx={{ marginTop: "5vh" }}>
          <Typography
            // gutterBottom
            variant="h4"
            component="div"
            color="primary.light"
          >
            {name}
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            gutterBottom
            component="div"
          >
            {description}
          </Typography>
          <Typography variant="h5" color="text.primary" gutterBottom>
            {price} грн
          </Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="primary"
            variant="outlined"
            sx={{ marginRight: "5vw", fontSize: "1.2rem", fontWeight: "700" }}
            onClick={() => dispatch(cartAdd(data.GoodFindOne))}
          >
            У кошик
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
