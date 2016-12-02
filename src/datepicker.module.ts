import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './datepicker/datepicker.component';

@NgModule({
  exports: [DatePickerComponent],
  declarations: [DatePickerComponent],
  imports: [CommonModule, FormsModule]
})
export class DatePickerModule {
    
}