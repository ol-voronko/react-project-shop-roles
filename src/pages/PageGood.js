import { good } from "../data";
import { useState } from "react";
import { endpoint } from "./Categories";
import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

export const PageGood = () => {
  const { name, description, images, price } = good;

  const Carousel = () => {
    const [current, setCurrent] = useState(0);

    return (
      <div>
        <img
          src={endpoint + images[current].url}
          style={{ width: "50%", aspectRatio: "1.2", position: "relative" }}
          alt={name}
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

  const Thumbnails = ({ images, current, onChange }) => {
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
            height: "50%",
            marginTop: "5vh",
          }}
          // height="50vh"
          // image={endpoint + images[0].url}
          // // image={good.images[0].url}
          // alt="green iguana"
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
          >
            У кошик
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
