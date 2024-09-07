import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { theme } from "./theme";
import styles from "../../App.css";
// import { SampleData } from "./SampleData";
import { api } from "../../APIpages/api";

const {
  useGetAllCatsQuery,
  useGetAllGoodsQuery,
  useUpsertGoodNameMutation,
  useUpsertCatNameMutation,
} = api;

export const CategoryTree = () => {
  const sampleData = [];
  const sortedCategories = [];
  const { isLoading: isQueryLoading, data: queryData } = useGetAllCatsQuery();
  const { isLoading, data } = useGetAllGoodsQuery();
  const [treeData, setTreeData] = useState(sortedCategories);
  const [upsertGoodNameQuery] = useUpsertGoodNameMutation();
  const [upsertCatNameQuery] = useUpsertCatNameMutation();
  const draggedItemRef = useRef();
  if (isLoading || isQueryLoading) {
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
    if (category?.parent === null) {
      updateCategory = {
        ...category,
        id: category._id,
        parent: 0,
        droppable: true,
      };
    } else if (parentsId.includes(category.parent._id)) {
      updateCategory = {
        ...category,
        id: category._id,
        parent: category.parent._id,
        droppable: true,
      };
    } else {
      updateCategory = {
        ...category,
        id: category._id,
        parent: category.parent._id,
        droppable: false,
      };
    }
    sampleData.push(updateCategory);
  }

  console.log(sampleData);

  for (const category of sampleData) {
    sortedCategories.push(category); // Добавляем категорию в результирующий массив

    // Теперь находим товары, относящиеся к данной категории
    for (const good of data.GoodFind) {
      // Проверяем, если товар относится к текущей категории
      if (
        Array.isArray(good.categories) &&
        good.categories.length &&
        good?.categories[0]._id === category._id
      ) {
        // Добавляем товар после категории
        sortedCategories.push({
          id: good._id,
          _id: good._id,
          name: good.name,
          parent: category._id, // Указываем родительскую категорию

          droppable: false, // Товар не может содержать других товаров
        });
      }
    }
  }

  console.log(sortedCategories);
  // const handleDrop = (newTree, ...otherParams) => {
  //   console.log("handle drop", newTree, otherParams);
  //   setTreeData(newTree);
  // };
  // const handleDrop = (newTree) => setTreeData(newTree);
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
