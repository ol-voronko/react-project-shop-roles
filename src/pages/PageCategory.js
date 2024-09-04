import { endpoint } from "./Categories";
import * as React from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { api } from "../APIpages/api.js";
import { useDispatch } from "react-redux";
import { cartAdd } from "../APIpages/reducers/cartReducer.js";

const { useGetCategoryByIdQuery } = api;

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
              images[0].url ? endpoint + images[0].url : "../images/box.jpg"
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

export const PageCategory = () => {
  const { _id } = useParams();
  const { isLoading, data } = useGetCategoryByIdQuery({ _id });
  console.log(isLoading, data);

  if (isLoading) {
    return (
      <>
        {" "}
        <h1>Loading...</h1>
      </>
    );
  }
  const {
    CategoryFindOne: { name, goods, subCategories },
  } = data;

  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {Array.isArray(subCategories) &&
          subCategories.map((el) => (
            <Link to={`/category/${el._id}`}> {el.name}</Link>
          ))}
      </ul>
      <div className="category-all">
        {Array.isArray(goods) && goods.length !== 0 ? (
          goods.map((good) =>
            good.price !== null && Array.isArray(good.images) ? (
              <CardGood good={good} />
            ) : (
              <p>Тут поки що пусто,але ми скоро це виправимо</p>
            )
          )
        ) : (
          <p>В цій категорії товарів поки що немає,але ми працюємо над цим</p>
        )}
      </div>
    </div>
  );
};
