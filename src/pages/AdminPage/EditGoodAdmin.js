import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "../../APIpages/api";
import {
  Card,
  TextField,
  Button,
  CardContent,
  CardActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { store } from "../../APIpages/store";
import { BACKEND_HOSTNAME } from "../../APIpages/api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Basic(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  //   const files = acceptedFiles.map((file) => (
  //     <li key={file.path}>
  //       {file.path} - {file.size} bytes
  //     </li>
  //   ));
  //   useEffect(() => {
  //     uploadFiles(acceptedFiles).then;
  //   }, [acceptedFiles]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}

const { useGetGoodByIdQuery, useUpsertGoodMutation } = api;

const uploadFile = (file) => {
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

const uploadFiles = (files) => Promise.all(files.map(uploadFile));

const reorder = (list, startIndex, endIndex) => {
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

const DND = ({
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

const DraggableImage = ({ image, onDelete }) => (
  <div>
    <img
      style={{ maxWidth: "100px" }}
      src={`http://${BACKEND_HOSTNAME}/${image.url}`}
    />
    <button onClick={() => onDelete(image)}>X</button>
  </div>
);

const UpsertGood = ({ defaultGood }) => {
  const [good, setGood] = useState({
    images: [],
    name: " ",
    description: " ",
  });

  useEffect(() => {
    if (defaultGood) {
      setGood(defaultGood);
    }
  }, [defaultGood]);

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
          }}
        >
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
      <div>
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
      <h3>Редагуємо</h3>
      {/* <UpsertGood /> */}
      <ShowAndEditGood />
      {/* <Basic /> */}
    </>
  );
};
