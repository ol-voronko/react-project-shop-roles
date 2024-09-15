import { BACKEND_HOSTNAME } from "../../APIpages/api";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import defaultImage from "../../images/box.jpg";

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
              ? `http://${BACKEND_HOSTNAME}/${good.image.url}`
              : defaultImage
          }
          alt="There should be a photo,soon"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/category/${good._id}`}>{good.name}</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
