import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Card, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./CustomNode.module.css";
import { api } from "../../APIpages/api";
import {
  uploadFiles,
  DraggableImage,
  DND,
} from "../AdminPage/EditGoodAdmin.js";
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

const { useUpsertCatMutation } = api;

export const EditCatAdmin = ({ handleCancel, defaultCat }) => {
  const [category, setCategory] = useState(defaultCat);

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
    <div style={{ position: "relative", zIndex: "3" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5%",
          color: "main-light",
          boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
          alignSelf: "flex-end",
          padding: "20px",
        }}
      >
        <div style={{ alignSelf: "flex-end" }}>
          <IconButton
            className={styles.editButton}
            onClick={() => upsertCat({ category })}
            disabled={category.name === ""}
          >
            <CheckIcon className={styles.editIcon} />
          </IconButton>
          <IconButton className={styles.editButton} onClick={handleCancel}>
            <CloseIcon className={styles.editIcon} />
          </IconButton>
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
        <TextField
          className={`${styles.textField}  ${styles.nodeInput}`}
          value={category.name}
          onChange={(e) => updateCategoryState("name", e.target.value)}
        >
          {" "}
          Category
        </TextField>
      </Card>
    </div>
  );
};
