import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline, Button } from "@mui/material";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { theme } from "./theme";
import styles from "../../App.css";

import { api } from "../../APIpages/api";
import shadows from "@mui/material/styles/shadows";

const {
  useGetAllCatsQuery,
  useGetAllGoodsQuery,
  useUpsertGoodNameMutation,
  useUpsertCatNameMutation,
} = api;

export const CategoryTree = () => {
  const sampleData = [];
  // const sortedCategories = [];
  const { isLoading: isQueryLoading, data: queryData } = useGetAllCatsQuery();
  // const { isLoading, data } = useGetAllGoodsQuery();
  const [treeData, setTreeData] = useState(sampleData);
  const [upsertGoodNameQuery] = useUpsertGoodNameMutation();
  const [upsertCatNameQuery] = useUpsertCatNameMutation();
  const draggedItemRef = useRef();
  if (isQueryLoading) {
    return <h3>Loading...</h3>;
  }
  // Перетворення отриманого з серверу масива в зручний формат
  const parentsId = [];
  for (const category of queryData.CategoryFind) {
    if (category.parent !== null) {
      parentsId.push(category.parent._id);
    }
  }
  for (const category of queryData.CategoryFind) {
    let updateCategory;
    // if (category?.parent === null) {
    //   updateCategory = {
    //     image: category.image,
    //     _id: category._id,
    //     id: category._id,
    //     name: category.name,
    //     parent: 0,
    //     droppable: true,
    //   };
    // } else if (parentsId.includes(category.parent._id)) {
    updateCategory = {
      image: category.image,
      _id: category._id,
      name: category.name,
      id: category._id,
      parent: category.parent ? category.parent._id : 0,
      droppable: true,
    };
    // }
    // else {
    //   updateCategory = {
    //     ...category,
    //     id: category._id,
    //     parent: category.parent._id,
    //     droppable: true,
    //   };
    // }
    sampleData.push(updateCategory);
    if (Array.isArray(category.goods) && category.goods.length) {
      for (const good of category.goods) {
        sampleData.push({
          id: good._id,
          _id: good._id,
          name: good.name,
          parent: category._id, // Указываем родительскую категорию
          droppable: false,
        });
      }
    }
  }

  console.log(sampleData);

  const handleDrop = async (newTree, dropCat) => {
    const draggedItem = draggedItemRef.current; // Получаем перемещаемый элемент
    console.log("Dropped item:", draggedItem);
    console.log("dropCat", dropCat);

    const draggedItemInNewTree = newTree.find(
      (good) => good.id === draggedItem.id
    );
    const draggedItemIndex = newTree.findIndex(
      (item) => item.id === draggedItem.id
    );
    const updateNewTree = [...newTree];
    if (draggedItemIndex !== -1) {
      // Удаляем элемент из старого места
      updateNewTree.splice(draggedItemIndex, 1);
    }
    const updatedDraggedItem = {
      ...draggedItemInNewTree,
      parent: dropCat.dropTargetId,
    };
    console.log(updateNewTree);
    updateNewTree.splice(dropCat.destinationIndex - 1, 0, updatedDraggedItem);
    console.log(updateNewTree);
    if (draggedItemInNewTree.droppable) {
      await upsertCatNameQuery({
        _id: draggedItem.id,
        subCategories: { _id: dropCat.dropTargetId },
      });
    } else {
      await upsertGoodNameQuery({
        _id: draggedItem.id,
        categories: { _id: dropCat.dropTargetId },
      });
    }
    setTreeData(updateNewTree);
  };
  // console.log("товари ", data.GoodFind.length);
  // console.log("cats ", queryData.CategoryFind.length);
  const handleTextChange = (id, value) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          name: value,
        };
      }

      return node;
    });

    setTreeData(newTree);
  };
  const handleDelete = (categoryId) => {
    const updatedTree = treeData.filter((item) => item.id !== categoryId);
    setTreeData(updatedTree);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app}>
          <Button
            component={Link}
            to="/admin/addCat"
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              alignSelf: "flex-start",
              boxShadow: shadows[2],
            }}
          >
            Додати категорію
          </Button>
          <Tree
            tree={treeData}
            rootId={0}
            render={(node, { depth, isOpen, onToggle }) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
                onTextChange={handleTextChange}
                onDelete={handleDelete}
              />
            )}
            // dragPreviewRender={(monitorProps) => (
            //   <CustomDragPreview monitorProps={monitorProps} />
            // )}
            // onDragStart={(...params) => console.log(params)}
            onDragStart={(item) => {
              draggedItemRef.current = item;
              console.log("Drag Item", item);
            }}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
            }}
            sort={false}
          />
        </div>
      </DndProvider>
    </ThemeProvider>
  );
};
