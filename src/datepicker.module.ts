import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './datepicker/datepicker.component';
import { DualPickerComponent } from './dualpicker/dualpicker.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';

@NgModule({
  exports: [DatePickerComponent, DualPickerComponent],
  declarations: [DatePickerComponent, DualPickerComponent, CalendarComponent, CalendarGridComponent],
  imports: [CommonModule, FormsModule]
})
export class DatePickerModule {
    
}