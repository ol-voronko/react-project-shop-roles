import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import { Carousel } from "../GoodPage/Carousel.js";

export const CardGoodAdmin = ({ good, handleDelete }) => {
  const { name, description, price, images, _id } = good;
  return (
    <>
      <CardMedia
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5vh",
          justifyContent: "space-between",
          marginTop: "5vh",
        }}
      >
        <Carousel images={images} />
      </CardMedia>
      <CardContent sx={{ marginTop: "5vh" }}>
        <Typography variant="h4" component="div" color="primary.light">
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
          color="error"
          variant="outlined"
          sx={{
            marginRight: "5vw",
            fontSize: "1.2rem",
            fontWeight: "700",
          }}
          onClick={handleDelete}
        >
          Видалити зі списку товарів
        </Button>
      </CardActions>
    </>
  );
};
