import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './datepicker/datepicker.component';
import { DualPickerComponent } from './datepicker/dualpicker.component';
import { CalendarComponent } from './datepicker/calendar.component';

@NgModule({
  exports: [DatePickerComponent, DualPickerComponent],
  declarations: [DatePickerComponent, DualPickerComponent, CalendarComponent],
  imports: [CommonModule, FormsModule]
})
export class DatePickerModule {
    
}