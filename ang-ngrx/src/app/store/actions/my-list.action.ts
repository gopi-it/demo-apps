import { createAction, props } from "@ngrx/store";

import { ListItem } from "../app.state";

// Action to add item to list
export const addListItem = createAction(
  '[LIST] ADD',
  props<{ name: string, status: string }>()
);

// Action to delete item from list
export const removeListItem = createAction(
  '[LIST] DELETE',
  props<{ id: number }>()
);

// Action to update item in list
export const updateListItem = createAction(
  '[LIST] UPDATE',
  props<ListItem>()
);
