import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module'

const MODULES = [
  CommonModule,
  MaterialModule
];
const COMPONENTS = [
];
const PROVIDERS = [
];

@NgModule({
  // declarations: [...COMPONENTS],
  imports: [...MODULES],
  // providers: [...PROVIDERS],
  // exports: [...COMPONENTS]
})
export class SharedModule { }
