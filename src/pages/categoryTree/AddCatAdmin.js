import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../../APIpages/api";
import {
  uploadFiles,
  DraggableImage,
  DND,
} from "../AdminPage/EditGoodAdmin.js";

// const grid = 8;

// const getListStyle = (isDraggingOver, direction) => ({
//   // background: isDraggingOver ? "lightblue" : "lightgrey",
//   // padding: grid,
//   // // width: 250
//   display: direction === "horizontal" ? "flex" : "",
//   overflow: "auto",
//   // maxWidth: '80%',
//   // width: '80%',
//   // // width: '100px',
//   // position: 'relative',
//   // left: '50%',
//   // right: '50%',
//   // marginLeft: '-50vw',
//   // marginRight: '-50vw'
// });
// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid / 4,
//   // margin: `0 0 ${grid}px 0`,
//   margin: grid,

//   // change background colour if dragging
//   // background: isDragging ? "lightgreen" : "white",
//   background: "white",
//   border: isDragging ? "2px solid" : "",
//   borderRadius: "5px",
//   // margin: grid,

//   // styles we need to apply on draggables
//   ...draggableStyle,
// });

const { useUpsertCatMutation } = api;
export const AddCatAdmin = () => {
  const [category, setCategory] = useState({
    image: null,
    name: "",
  });
  const [upsertCat] = useUpsertCatMutation();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    noClickBubbling: true,
  });
  useEffect(() => {
    if (acceptedFiles.length)
      uploadFiles(acceptedFiles).then((result) =>
        updateCategoryState("image", result[0])
      );
  }, [acceptedFiles]);

  const updateCategoryState = (key, value) =>
    setCategory((category) => ({ ...category, [key]: value }));
  return (
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5%",
          color: "main-light",
          boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
        }}
      >
        <IconButton
          component={Link}
          to={"/admin/categories"}
          aria-label="delete"
          size="large"
          sx={{ alignSelf: "flex-end" }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>

        <div>
          <Typography variant="h4" color="info.light">
            Нова категорія
          </Typography>
        </div>
        <div>
          <div className="dnd-images">
            <DND
              items={category.image ? [category.image] : null}
              render={DraggableImage}
              dataProp="image"
              direction="horizontal"
              keyField="_id"
              onChange={(newImage) => updateCategoryState("image", newImage)}
              propsForRender={{
                onDelete() {
                  updateCategoryState("image", null);
                },
              }}
            />
          </div>
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        </div>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2vh",
          }}
        >
          <TextField
            label="Назва категорії"
            placeholder={category.name}
            value={category.name}
            onChange={(e) => updateCategoryState("name", e.target.value)}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="primary"
            variant="outlined"
            sx={{
              marginRight: "5vw",
              fontSize: "1.2rem",
              fontWeight: "700",
            }}
            onClick={() => upsertCat({ category })}
          >
            Зберегти
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
