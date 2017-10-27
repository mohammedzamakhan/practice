import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressModule } from '../progress/progress.module';
import { FormsModule } from '@angular/forms';

const modules = [
  CommonModule,
  ProgressModule,
  FormsModule,
  HttpClientModule
];

@NgModule({
  imports: [
    modules,
  ],
  exports: [
    modules,
  ],
  declarations: []
})
export class SharedModule { }
