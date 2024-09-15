import { endpoint } from "../PageMain/PageMain.js";
import * as React from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { api } from "../../APIpages/api.js";
import { useDispatch } from "react-redux";
import { cartAdd } from "../../APIpages/reducers/cartReducer.js";
import { CardGood } from "./CategoryCardGood.js";
const { useGetCategoryByIdQuery } = api;

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
              <Card>
                <Typography gutterBottom variant="h5" component="div">
                  Тут поки що пусто,але ми скоро це виправимо
                </Typography>
              </Card>
            )
          )
        ) : (
          <p>В цій категорії товарів поки що немає,але ми працюємо над цим</p>
        )}
      </div>
    </div>
  );
};
