import { useState } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "./Categories";
import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { api } from "../APIpages/api";
import { cartAdd } from "../APIpages/reducers/cartReducer";
import { useDispatch } from "react-redux";

const { useGetGoodByIdQuery } = api;
export const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <img
        src={endpoint + images[current].url}
        style={{
          width: "50%",
          aspectRatio: "0.8",
          position: "relative",
        }}
        alt="Some good"
        onClick={(e) => {
          const { layerX } = e.nativeEvent;
          const { clientWidth } = e.target;

          layerX < clientWidth / 3
            ? setCurrent((current) =>
                current === 0 ? (current = images.length - 1) : +current - 1
              )
            : setCurrent((current) =>
                current === images.length - 1 ? (current = 0) : +current + 1
              );
        }}
      />
      <Thumbnails
        images={images}
        current={current}
        onChange={(index) => setCurrent(index)}
      />
    </div>
  );
};
export const Thumbnails = ({ images, current, onChange }) => {
  return (
    <div className="thumbnails">
      {images.map((image, index) => (
        <img
          src={endpoint + image.url}
          alt="beauty of nature"
          onClick={() => onChange(index)}
          style={
            index === current
              ? {
                  border: " 5px, solid ,black",
                  padding: "2px",
                  width: "2vw",
                }
              : {
                  border: " none",
                  width: "100px",
                  boxSizing: "border-box",
                  width: "2vw",
                }
          }
        />
      ))}
    </div>
  );
};

export const PageGood = () => {
  const dispatch = useDispatch();

  const { _id } = useParams();
  const { isLoading, data } = useGetGoodByIdQuery({ _id });
  console.log(isLoading, data, _id);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  const {
    GoodFindOne: { name, description, images, price },
  } = data;

  return (
    <div className="category-all">
      <Card
        sx={{
          width: "50vw",
          boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
        }}
      >
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
