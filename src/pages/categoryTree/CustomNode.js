import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useDragOver } from "@minoru/react-dnd-treeview";
import styles from "./CustomNode.module.css";
import { api } from "../../APIpages/api";
import { BACKEND_HOSTNAME } from "../../APIpages/api";
import defaultImage from "../../images/box.jpg";
import { EditCatAdmin } from "./EditCatAdmin";

const {
  useUpsertGoodNameMutation,
  useUpsertCatNameMutation,
  useDeleteCatMutation,
  useDeleteGoodMutation,
} = api;

export const CustomNode = (props) => {
  const { id, name, _id, droppable, image } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(name);

  const [upsertGoodNameQuery] = useUpsertGoodNameMutation();
  const [upsertCat] = useUpsertCatNameMutation();
  const [deleteCatQuery] = useDeleteCatMutation();
  const [deleteGoodQuery] = useDeleteGoodMutation();

  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(name);
    setVisibleInput(false);
  };

  const handleChangeText = (e) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = async () => {
    if (droppable) {
      await upsertCat({ _id, name: labelText, image: image });
    } else {
      await upsertGoodNameQuery({ _id, name: labelText });
    }
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };
  const handleDelete = async () => {
    if (droppable) {
      await deleteCatQuery({ _id });
    } else {
      await deleteGoodQuery({ _id });
    }
    props.onDelete(id);
  };
  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && (
          <div
            style={{ display: "flex", alignItems: "flex-start" }}
            onClick={handleToggle}
          >
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div className={styles.labelGridItem}>
        {visibleInput ? (
          droppable ? (
            <EditCatAdmin
              defaultCat={{ _id, name, image }}
              // image={image}
              // labelText={labelText}
              // handleChangeText={handleChangeText}
              // handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          ) : (
            <div className={styles.inputWrapper}>
              <TextField
                className={`${styles.textField}
              ${styles.nodeInput}`}
                value={labelText}
                onChange={handleChangeText}
              />
              <IconButton
                className={styles.editButton}
                onClick={handleSubmit}
                disabled={labelText === ""}
              >
                <CheckIcon className={styles.editIcon} />
              </IconButton>
              <IconButton className={styles.editButton} onClick={handleCancel}>
                <CloseIcon className={styles.editIcon} />
              </IconButton>
            </div>
          )
        ) : (
          <div className={styles.inputWrapper}>
            <Typography variant="h6" className={styles.nodeLabel}>
              {props.node.name}
            </Typography>
            <IconButton className={styles.editButton} onClick={handleShowInput}>
              <EditIcon className={styles.editIcon} />
            </IconButton>
            <IconButton className={styles.editButton} onClick={handleDelete}>
              <CloseIcon className={styles.editIcon} />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};
