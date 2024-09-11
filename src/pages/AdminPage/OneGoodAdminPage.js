import { useParams, Link } from "react-router-dom";
import { api } from "../../APIpages/api";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import { BACKEND_HOSTNAME } from "../../APIpages/api";
import ModeIcon from "@mui/icons-material/Mode";
import CloseIcon from "@mui/icons-material/Close";
import { Carousel } from "../PageGood";

import { useState } from "react";
import { EditGoodAdmin } from "./EditGoodAdmin";
import { CardGoodAdmin } from "./CardGoodAdmin";

const { useGetGoodByIdQuery, useDeleteGoodMutation } = api;

export const OneGoodAdminPage = () => {
  const [isRedact, setIsRedact] = useState(false);

  const { _id } = useParams();
  const { isLoading, data } = useGetGoodByIdQuery({ _id });
  const [deleteGood] = useDeleteGoodMutation();

  if (isLoading) {
    return <h3>Loading...please wait...</h3>;
  }
  const {
    GoodFindOne: { name, description, images, price },
  } = data;
  const handleDelete = () => deleteGood({ _id });

  return (
    <div className="category-all">
      <Card
        sx={{
          width: "50vw",
          boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="admin-btns">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => setIsRedact((isRedact) => !isRedact)}
          >
            <ModeIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            component={Link}
            to={"/admin/goods"}
            aria-label="delete"
            size="large"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        {isRedact ? (
          <EditGoodAdmin />
        ) : (
          <CardGoodAdmin good={data?.GoodFindOne} handleDelete={handleDelete} />
        )}
        {/**<Crasivyi /> */}
        {/* <CardMedia
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
        </CardContent> */}
      </Card>
    </div>
  );
};
