import { Component, AfterViewInit, OnInit, OnDestroy, ElementRef, Renderer, ViewEncapsulation, Input, ViewChild, QueryList } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendarMode';

export enum Mode {
  Calendar, Month, Year, Hidden
}

export enum Type {
  Text,
  DoubleText
}

@Component({
  moduleId: module.id,
  selector: 'ct-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements AfterViewInit, OnDestroy, OnInit {
  numYearsShown = 9;
  halfNumYearsShown = Math.floor(this.numYearsShown / 2);

  public Mode = Mode;
  public Type = Type;

  @ViewChild(CalendarComponent)
  public cal1: CalendarComponent;

  @Input("type") private iType: string;
  public type: Type;

  public dateString: string;

  constructor(private myElement: ElementRef, private renderer: Renderer) {

  }


  public changeMode(mode: CalendarMode) {
    this.cal1.mode = mode;
    switch (this.cal1.mode) {
      case CalendarMode.Calendar:
        this.renderCalendar();
      case CalendarMode.Year:
        this.generateYearData(this.cal1.date.year());
        break;
    }
  }

  public goPrev() {
    switch (this.cal1.mode) {
      case CalendarMode.Calendar:
        this.cal1.date.month(this.cal1.date.month() - 1);
        this.renderCalendar();
        break;
      case CalendarMode.Month:
        break;
      case CalendarMode.Year:
        this.generateYearData(this.cal1.years[this.halfNumYearsShown] - this.numYearsShown);
        break;
    }
  }

  public goNext() {
    switch (this.cal1.mode) {
      case CalendarMode.Calendar:
        this.cal1.date.month(this.cal1.date.month() + 1);
        this.renderCalendar();
        break;
      case CalendarMode.Month:
        break;
      case CalendarMode.Year:
        this.generateYearData(this.cal1.years[this.halfNumYearsShown] + this.numYearsShown);
        break;
    }
  }

  public setMonth(index: number) {
    this.cal1.date.month(index);
    this.changeMode(CalendarMode.Calendar);
  }

  public setYear(year: number) {
    this.cal1.date.year(year);
    this.changeMode(CalendarMode.Calendar);
  }

  ngAfterViewInit() {
    this.renderCalendar();
  }

  ngOnInit() {
    let iType = this.iType.toLowerCase();
    if (iType === "text") {
      this.type = Type.Text
    } else if (iType === "doubletext") {
      this.type = Type.DoubleText
    }

    this.cal1.date = moment(new Date());
    this.generateMonthData();
  }

  ngOnDestroy() {

  }

  generateYearData(year: number) {
    this.cal1.years = [];
    let y = year - this.halfNumYearsShown;
    for (var i = 0; i < this.numYearsShown; i++) {
      this.cal1.years.push(y + i);
    }
  }

  generateMonthData() {
    let date = moment(this.cal1.date); //doesn't change
    let d = moment(this.cal1.date);
    d.month(0);
    while (date.year() === d.year()) {
      this.cal1.months.push(d.format("MMM"));
      d.month(d.month() + 1);
    }
  }

  renderCalendar() {
    this.cal1.renderCalendar(this.dateClickListener, this.cal1.date, this.cal1.date);
  }

  dateClickListener = (date: moment.Moment) => {
    let d = moment(date);
    return () => {
      this.setDate(d);
    }
  }

  setDate(date: moment.Moment) {
    this.cal1.date = date;
    this.renderCalendar();
    this.dateString = this.cal1.date.format("MM/DD/YYYY");
  }
}
