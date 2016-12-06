import { Component, AfterViewInit, OnInit, OnDestroy, ElementRef, Renderer, ViewEncapsulation, Input, ViewChild, QueryList } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from './calendar.component';
import { Picker } from './dualpicker.component';

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
export class DatePickerComponent extends Picker implements AfterViewInit, OnDestroy, OnInit  {
  numYearsShown = 9;
  halfNumYearsShown = Math.floor(this.numYearsShown / 2);

  public Mode = Mode;
  public Type = Type;

  @ViewChild('cal1', CalendarComponent)
  public cal1: CalendarComponent;

  @Input("type") private iType: string;
  public type: Type;

  constructor(private myElement: ElementRef, private renderer: Renderer) {
    super();
    this.date = moment(new Date());
    this.generateMonthData();
  }


  public changeMode(mode: Mode) {
    this.mode = mode;
    switch (this.mode) {
      case Mode.Calendar:
        this.renderCalendar();
      case Mode.Year:
        this.generateYearData(this.date.year());
        break;
    }
  }

  public goPrev() {
    switch (this.mode) {
      case Mode.Calendar:
        this.date.month(this.date.month() - 1);
        this.renderCalendar();
        break;
      case Mode.Month:
        break;
      case Mode.Year:
        this.generateYearData(this.years[this.halfNumYearsShown] - this.numYearsShown);
        break;
    }
  }

  public goNext() {
    switch (this.mode) {
      case Mode.Calendar:
        this.date.month(this.date.month() + 1);
        this.renderCalendar();
        break;
      case Mode.Month:
        break;
      case Mode.Year:
        this.generateYearData(this.years[this.halfNumYearsShown] + this.numYearsShown);
        break;
    }
  }

  public setMonth(index: number) {
    this.date.month(index);
    this.changeMode(Mode.Calendar);
  }

  public setYear(year: number) {
    this.date.year(year);
    this.changeMode(Mode.Calendar);
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
  }

  ngOnDestroy() {

  }

  generateYearData(year: number) {
    this.years = [];
    let y = year - this.halfNumYearsShown;
    for (var i = 0; i < this.numYearsShown; i++) {
      this.years.push(y + i);
    }
  }

  generateMonthData() {
    let date = moment(this.date); //doesn't change
    let d = moment(this.date);
    d.month(0);
    while (date.year() === d.year()) {
      this.months.push(d.format("MMM"));
      d.month(d.month() + 1);
    }
  }

  renderCalendar() {
    this.cal1.renderCalendar(this, this.dateClickListener, this.date, this.date);
  }

  dateClickListener = (date: moment.Moment) => {
    let d = moment(date);
    return () => {
      this.setDate(d);
    }
  }

  setDate(date: moment.Moment) {
    this.date = date;
    this.renderCalendar();
    this.dateString = this.date.format("MM/DD/YYYY");
  }
}
