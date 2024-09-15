import { useState, useEffect } from "react";
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
import { useParams, Link } from "react-router-dom";
import { store } from "../../APIpages/store";
import { BACKEND_HOSTNAME } from "../../APIpages/api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const { useGetGoodByIdQuery, useUpsertGoodMutation, useDeleteGoodMutation } =
  api;

export const uploadFile = (file) => {
  const fd = new FormData();
  fd.append("photo", file);
  const { token } = store.getState().auth;
  return fetch(`http://${BACKEND_HOSTNAME}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: fd,
  }).then((res) => res.json());
};

export const uploadFiles = (files) => Promise.all(files.map(uploadFile));

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

export const DND = ({
  items,
  keyField,
  onChange,
  render: Render,
  propsForRender,
  dataProp = "item",
  direction = "vertical",
}) => {
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    onChange(newItems);
  };
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        style={{ transform: "none" }}
        droppableId="droppable"
        direction={direction}
      >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, direction)}
          >
            {items?.map?.((item, index) => (
              <Draggable
                key={item[keyField]}
                draggableId={`id_${item[keyField]}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Render
                      {...{
                        [dataProp]: item,
                        isDragging: snapshot.isDragging,
                        index,
                        ...propsForRender,
                      }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export const DraggableImage = ({ image, onDelete }) => (
  <div className="draggable-image">
    <img
      style={{ width: "150px", height: "150px" }}
      src={`http://${BACKEND_HOSTNAME}/${image.url}`}
    />
    <IconButton onClick={() => onDelete(image)}>
      <CloseIcon />
    </IconButton>
  </div>
);

export const UpsertGood = ({ defaultGood }) => {
  const [good, setGood] = useState({
    images: [],
    name: " ",
    description: " ",
    price: " ",
    categories: [{ name: "Without Category", _id: "66ddcab8e866766ddd7c6893" }],
  });

  useEffect(() => {
    if (defaultGood) {
      setGood(defaultGood);
    }
  }, [defaultGood]);

  const [upsertQuery] = useUpsertGoodMutation();
  const [deleteGood] = useDeleteGoodMutation();
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
              sx={{ marginRight: "5vw", fontSize: "1.2rem", fontWeight: "700" }}
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

const ShowAndEditGood = () => {
  const { _id } = useParams();
  const { isFetching, data } = useGetGoodByIdQuery({ _id });
  return (
    <div>
      {data?.GoodFindOne && <UpsertGood defaultGood={data.GoodFindOne} />}
    </div>
  );
};
export const EditGoodAdmin = () => {
  return (
    <>
      <Typography variant="h4" color="primary.light">
        Редагуємо
      </Typography>
      <ShowAndEditGood />
    </>
  );
};
