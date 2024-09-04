import React, { useState } from "react";
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

const { useGetAllCatsQuery } = api;

export const CategoryTree = () => {
  const sampleData = [];
  const sortedCategories = [];
  const { isLoading, data } = useGetAllCatsQuery();
  const [treeData, setTreeData] = useState(sortedCategories);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  for (const category of data.CategoryFind) {
    let updateCategory;
    if (category?.parent === null) {
      updateCategory = { ...category, parent: 0, droppable: true };
    } else {
      updateCategory = {
        ...category,
        parent: category.parent._id,
        droppable: false,
      };
    }
    sampleData.push(updateCategory);
  }
  console.log(sampleData);
  const categoryMap = new Map();
  sampleData.forEach((category) => {
    categoryMap.set(category._id, { ...category });
  });

  // Создаем массив для хранения корневых категорий и будущего отсортированного списка
  const rootCategories = [];

  // Разделяем категории на корневые и дочерние
  sampleData.forEach((category) => {
    if (category.parent === 0) {
      rootCategories.push(categoryMap.get(category._id));
    }
  });

  // Рекурсивная функция для добавления категории и её детей в плоский список
  function addCategoryAndChildrenToList(category) {
    sortedCategories.push(category);
    // Находим и добавляем детей категории, если они существуют
    sampleData.forEach((item) => {
      if (item.parent === category._id) {
        addCategoryAndChildrenToList(categoryMap.get(item._id));
      }
    });
  }

  // Заполняем отсортированный список, начиная с корневых категорий
  rootCategories.forEach((category) => {
    addCategoryAndChildrenToList(category);
  });

  console.log(sortedCategories);

  const handleDrop = (newTree) => setTreeData(newTree);
  const handleTextChange = (_id, value) => {
    const newTree = treeData.map((node) => {
      if (node._id === _id) {
        return {
          ...node,
          name: value,
        };
      }

      return node;
    });

    setTreeData(newTree);
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
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
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
