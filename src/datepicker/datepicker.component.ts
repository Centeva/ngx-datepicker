import { Component, AfterViewInit, OnDestroy, ElementRef, OnInit, Renderer, ViewEncapsulation, Input, ViewChild, QueryList } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendarMode';

export enum DatePickerMode {
  Visible, Hidden
}

@Component({
  moduleId: module.id,
  selector: 'ct-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.css', '../common/common.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements AfterViewInit, OnDestroy, OnInit {


  public CalendarMode = CalendarMode;
  public DatePickerMode = DatePickerMode;

  public date: moment.Moment;
  public dateString: string;

  @ViewChild(CalendarComponent) public cal: CalendarComponent;
  public mode: DatePickerMode = DatePickerMode.Hidden;

  constructor(private myElement: ElementRef, private renderer: Renderer) {

  }

  public changeGlobalMode(mode: DatePickerMode) {
    this.mode = mode;
    switch (this.mode) {
      case DatePickerMode.Visible:
        this.changeMode(CalendarMode.Calendar);
        break;
    }
  }

  public blur(event) {
    if ((event.which || event.keyCode) == 9) {
      this.changeGlobalMode(DatePickerMode.Hidden);
    }
  }

  public changeMode(mode: CalendarMode) {
    this.cal.changeMode(mode);
    switch (mode) {
      case CalendarMode.Calendar:
        this.renderCalendar();
        break;
    }
  }

  public goPrev() {
    if (this.cal.mode == CalendarMode.Calendar) {
      this.cal.date.month(this.cal.date.month() - 1);
      this.renderCalendar();
    } else {
      this.cal.goPrev();
    }
  }

  public goNext() {
    if (this.cal.mode == CalendarMode.Calendar) {
      this.cal.date.month(this.cal.date.month() + 1);
      this.renderCalendar();
    } else {
      this.cal.goNext();
    }
  }

  ngOnInit() {
    this.cal.date = moment(new Date());
    this.cal.subscribeToChangeMonth(this.monthChangeListener);
    this.cal.subscribeToChangeYear(this.yearChangeListener);
  }

  ngAfterViewInit() {
    this.renderCalendar();
  }

  ngOnDestroy() {

  }

  renderCalendar() {
    this.cal.renderCalendar(this.dateClickListener, this.date, this.date);
  }

  dateClickListener = (date: moment.Moment) => {
    let d = moment(date);
    return () => {
      this.setDate(d);
    }
  }

  private monthChangeListener = () => {
    this.changeMode(CalendarMode.Calendar);
  }

  private yearChangeListener = () => {
    this.changeMode(CalendarMode.Calendar);
  }

  setDate(date: moment.Moment) {
    switch (this.mode) {
      case DatePickerMode.Visible:
        this.date = date;
        this.dateString = date.format("MM/DD/YYYY");
        this.changeGlobalMode(DatePickerMode.Hidden);
        break;
    }
    this.renderCalendar();
  }

}
