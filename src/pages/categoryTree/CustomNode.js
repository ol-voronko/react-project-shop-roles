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

export const CustomNode = (props) => {
  const { _id, name } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(name);
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node._id);
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

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(_id, labelText);
  };

  const dragOverProps = useDragOver(_id, props.isOpen, props.onToggle);

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
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div className={styles.labelGridItem}>
        {visibleInput ? (
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
        ) : (
          <div className={styles.inputWrapper}>
            <Typography variant="body2" className={styles.nodeLabel}>
              {props.node.name}
            </Typography>
            <IconButton className={styles.editButton} onClick={handleShowInput}>
              <EditIcon className={styles.editIcon} />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};
