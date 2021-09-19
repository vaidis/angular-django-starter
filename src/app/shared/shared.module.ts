import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [
    InputComponent
  ]
})
export class SharedModule { }
