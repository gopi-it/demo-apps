import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { addListItem } from '../store/actions/my-list.action';
import { AppState } from '../store/app.state';
import { selectListOptions } from '../store/selectors/my-list.selector';

@Component({
  selector: 'app-get-input',
  templateUrl: './get-input.component.html',
  styleUrls: ['./get-input.component.scss'],
})
export class GetInputComponent {

  @ViewChild('taskName') taskNameEl?: ElementRef;
  public listOptions$ = this.store.select(selectListOptions).pipe(
    tap(opts => {
      this.defaultOptVal = opts[0].key;
      this.setDefaultOpt();
    })
  );

  public listInputForm = this.fb.group({
    taskName: [null, Validators.required],
    taskStatus: [null, Validators.required]
  });

  private defaultOptVal?: string;

  constructor(
    private readonly store: Store<AppState>,
    private fb: FormBuilder
  ) { }

  public addTaskItem(): void {
    const formValue = this.listInputForm.value;
    // Dispatching action to add task in store
    this.store.dispatch(addListItem({
      name: formValue.taskName,
      status: formValue.taskStatus
    }));

    this.resetInput();
  }

  private resetInput(): void {
    this.listInputForm.reset();
    this.setDefaultOpt();
    this.taskNameEl?.nativeElement.focus();
  }

  private setDefaultOpt(): void {
    this.listInputForm.patchValue({
      taskStatus: this.defaultOptVal
    })
  }

}
