import { createReducer, on } from "@ngrx/store";

import { ToDoList } from "../app.state";
import { addListItem, removeListItem, updateListItem } from "../actions/my-list.action";


// Value of initial state to be present in store
const defaultState: ToDoList = {
  listItems: [],
  listStatus: {
    new: 'New',
    inProgress: 'In Progress',
    hold: 'Hold',
    done: 'Done'
  }
};

export const listItemReducer = createReducer(
  // Assigning default value for state
  defaultState,
  // Adding a new item to state using addListItem action
  on(addListItem, (state, payload) => {
    const { name, status } = payload;

    const listItems = state.listItems;
    const id = listItems.length;
    return {
      ...state,
      listItems: [...listItems, {
        id,
        name,
        status
      }],
    }
  }),
  // Deleting an item from state using removeListItem action
  on(removeListItem, (state, { id }) => {
    const listItems = state.listItems.filter(listItem => {
      return listItem.id !== id
    })
    return {
      ...state,
      listItems
    }
  }),
  // Updating an item present in state using updateListItem action
  on(updateListItem, (state, payload) => {
    const id = payload.id;
    const listItems = state.listItems.map(task => {
      if (task.id === id) {
        return payload;
      } else {
        return task;
      }
    })
    return {
      ...state,
      listItems
    }
  })
);

