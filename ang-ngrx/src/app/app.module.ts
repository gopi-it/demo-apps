import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { DisplayListComponent } from './display-list/display-list.component';
import { GetInputComponent } from './get-input/get-input.component';
import { listItemReducer } from './store/reducers/my-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    GetInputComponent,
    DisplayListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ toDoList: listItemReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
