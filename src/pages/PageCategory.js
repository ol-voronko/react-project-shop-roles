import { category } from "../data";
import { endpoint } from "./Categories";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

const MultiActionAreaCard = ({ good }) => {
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
        >
          У кошик
        </Button>
      </CardActions>
    </Card>
  );
};

export const PageCategory = () => {
  return (
    <div>
      <h1>{category.name}</h1>
      <span>{category.subCategories}</span>
      <div className="category-all">
        {category.goods.map((good) => (
          <MultiActionAreaCard good={good} />
        ))}
      </div>
    </div>
  );
};
