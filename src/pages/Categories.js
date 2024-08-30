// import { categories } from "../data";
import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import defaultImage from "../images/box.jpg";
import { api } from "../APIpages/api";

const { useGetRootCatsQuery } = api;
export const endpoint = "http://shop-roles.node.ed.asmer.org.ua/";

export const CardCategory = ({ good }) => {
  return (
    <div className="category-all">
      <Card
        sx={{
          width: "20vw",
          boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={
            good.image && good.image.url
              ? endpoint + good.image.url
              : defaultImage
          }
          alt="There should be a photo,soon"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/category/${good._id}`}>{good.name}</Link>
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {good.description}
          </Typography> */}
        </CardContent>

        {/* <CardActions>
          <Button size="large" variant="outlined" color="primary">
            <Link to={`/category/${good._id}`}>Детальніше</Link>
          </Button>
        </CardActions> */}
      </Card>
    </div>
  );
};

export const PageMain = () => {
  const { isLoading, data } = useGetRootCatsQuery();

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  return (
    <div className="category-all">
      {data.CategoryFind.map((category) => (
        <CardCategory key={category._id} good={category} />
      ))}
    </div>
  );
};
