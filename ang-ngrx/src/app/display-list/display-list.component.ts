import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AppState, ListItem } from '../store/app.state';
import { removeListItem, updateListItem } from '../store/actions/my-list.action';
import { selectListOptions, selectListValues } from '../store/selectors/my-list.selector';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss'],
})
export class DisplayListComponent {

  public listItems$ = this.store.select(selectListValues);
  public listOptions$ = this.store.select(selectListOptions);

  public editTaskForm = this.fb.group({
    taskId: [null, Validators.required],
    taskName: [null, Validators.required],
    taskStatus: [null, Validators.required]
  });

  constructor(
    private readonly store: Store<AppState>,
    private fb: FormBuilder
  ) { }

  public deleteItem(taskId: number): void {
    // Dispatching action to delete task in store
    this.store.dispatch(removeListItem({
      id: taskId
    }));
  }

  public setEditForm(option: ListItem): void {
    this.editTaskForm.setValue({
      taskId: option.id,
      taskName: option.name,
      taskStatus: option.status
    })
  }

  public updateItem(): void {
    const taskItem = this.editTaskForm.value;
    // Dispatching action to update task in store
    this.store.dispatch(updateListItem({
      id: taskItem.taskId,
      name: taskItem.taskName,
      status: taskItem.taskStatus
    }));
  }
}
