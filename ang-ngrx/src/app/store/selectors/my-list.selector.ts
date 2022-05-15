import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ToDoList } from "../app.state";
import { ListStatusOption } from "../../types/todo-list.type";


export const selectToDoList = createFeatureSelector<ToDoList>('toDoList');

export const selectListItems = createSelector(selectToDoList, (state: ToDoList) => state.listItems);
export const selectListStatus = createSelector(selectToDoList, (state: ToDoList) => state.listStatus);

export const selectListOptions = createSelector(selectListStatus, listStatus => {
  const options: ListStatusOption[] = [];
  Object.keys(listStatus).forEach(statusKey => {
    options.push({
      key: statusKey,
      label: listStatus[statusKey]
    });
  });
  return options;
})

export const selectListValues = createSelector(selectListItems, selectListStatus, (items, status) => {
  return items.map(item => ({
    ...item,
    name: item.name.toLowerCase(),
    statusLabel: status[item.status]
  }));
})
