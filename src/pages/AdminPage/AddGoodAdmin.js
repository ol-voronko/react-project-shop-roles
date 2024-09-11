import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { api } from "../../APIpages/api";
import {
  Card,
  TextField,
  Button,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import { store } from "../../APIpages/store";
import { BACKEND_HOSTNAME } from "../../APIpages/api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  uploadFile,
  uploadFiles,
  reorder,
  DND,
  DraggableImage,
} from "./EditGoodAdmin";

const grid = 8;

const getListStyle = (isDraggingOver, direction) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  // padding: grid,
  // // width: 250
  display: direction === "horizontal" ? "flex" : "",
  overflow: "auto",
  // maxWidth: '80%',
  // width: '80%',
  // // width: '100px',
  // position: 'relative',
  // left: '50%',
  // right: '50%',
  // marginLeft: '-50vw',
  // marginRight: '-50vw'
});
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid / 4,
  // margin: `0 0 ${grid}px 0`,
  margin: grid,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "white",
  background: "white",
  border: isDragging ? "2px solid" : "",
  borderRadius: "5px",
  // margin: grid,

  // styles we need to apply on draggables
  ...draggableStyle,
});
const { useUpsertGoodMutation } = api;
export const AddGoodAdmin = () => {
  const [good, setGood] = useState({
    images: [],
    name: " ",
    description: " ",
    price: " ",
    categories: [{ name: "Without Category", _id: "66ddcab8e866766ddd7c6893" }],
  });

  const [upsertQuery] = useUpsertGoodMutation();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    noClickBubbling: true,
  });
  useEffect(() => {
    if (acceptedFiles.length)
      uploadFiles(acceptedFiles).then((results) =>
        updateGoodState("images", [...good.images, ...results])
      );
  }, [acceptedFiles]);

  const updateGoodState = (key, value) =>
    setGood((good) => ({ ...good, [key]: value }));
  console.log(good);

  return (
    <div>
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
            to={"/admin/goods"}
            aria-label="delete"
            size="large"
            sx={{ alignSelf: "flex-end" }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <div>
            <Typography variant="h4" color="info.light">
              Новий товар
            </Typography>
            <div className="dnd-images">
              <DND
                items={good.images}
                render={DraggableImage}
                dataProp="image"
                direction="horizontal"
                keyField="_id"
                onChange={(newImages) => updateGoodState("images", newImages)}
                propsForRender={{
                  onDelete(image) {
                    updateGoodState(
                      "images",
                      good.images.filter((i) => i !== image)
                    );
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
              label="Назва товару"
              placeholder={good.name}
              value={good.name}
              onChange={(e) => updateGoodState("name", e.target.value)}
            />
            <TextField
              label="Опис товару"
              multiline
              value={good.description}
              onChange={(e) => updateGoodState("description", e.target.value)}
            />
            <TextField
              label="Ціна товару,грн"
              placeholder={good.price}
              value={good.price}
              onChange={(e) => updateGoodState("price", Number(e.target.value))}
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
              onClick={() => upsertQuery({ good })}
            >
              Зберегти
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
