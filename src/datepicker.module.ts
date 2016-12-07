import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './datepicker/datepicker.component';
import { DualPickerComponent } from './datepicker/dualpicker.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarGridComponent } from './calendarGrid/calendarGrid.component';

@NgModule({
  exports: [DatePickerComponent, DualPickerComponent],
  declarations: [DatePickerComponent, DualPickerComponent, CalendarComponent, CalendarGridComponent],
  imports: [CommonModule, FormsModule]
})
export class DatePickerModule {
    
}