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

const { useGetAllCatsQuery, useGetAllGoodsQuery } = api;

export const CategoryTree = () => {
  const sampleData = [];
  const sortedCategories = [];
  const { isLoading: isQueryLoading, data: queryData } = useGetAllCatsQuery();
  const { isLoading, data } = useGetAllGoodsQuery();
  const [treeData, setTreeData] = useState(sortedCategories);

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
  //   const categoryMap = new Map();
  //   sampleData.forEach((category) => {
  //     categoryMap.set(category._id, { ...category });
  //   });

  // Создаем массив для хранения корневых категорий и будущего отсортированного списка
  //   const rootCategories = [];

  //   // Разделяем категории на корневые и дочерние
  //   sampleData.forEach((category) => {
  //     if (category.parent === 0) {
  //       rootCategories.push(categoryMap.get(category._id));
  //     }
  //   });
  //   //   for (const good of data.GoodFind) {
  //   //     let updateGood = {
  //   //       ...good,
  //   //       id: good._id,
  //   //       parent: good.categories[0]._id,
  //   //       droppable: false,
  //   //     };
  //   //     sampleData.push(updateGood);
  //   //   }
  //   // Рекурсивная функция для добавления категории и её детей в плоский список
  //   function addCategoryAndChildrenToList(category) {
  //     sortedCategories.push(category);
  //     // Находим и добавляем детей категории, если они существуют
  //     sampleData.forEach((item) => {
  //       if (item.parent === category._id) {
  //         addCategoryAndChildrenToList(categoryMap.get(item._id));
  //       }
  //     });
  //   }

  //   // Заполняем отсортированный список, начиная с корневых категорий
  //   rootCategories.forEach((category) => {
  //     addCategoryAndChildrenToList(category);
  //   });

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

  const handleDrop = (newTree) => setTreeData(newTree);
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
