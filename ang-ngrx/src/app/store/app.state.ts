export interface AppState {
  toDoList: ToDoList;
}

export interface ToDoList {
  listItems: ListItem[];
  listStatus: ListStatus;
}

export interface ListItem {
  id: number;
  name: string;
  status: string;
  statusLabel?: string;
}

export interface ListStatus {
  [key: string]: string;
}

