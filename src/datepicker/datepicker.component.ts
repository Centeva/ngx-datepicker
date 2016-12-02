import { Component, OnInit, OnDestroy, ElementRef, Renderer, ViewEncapsulation, Input } from '@angular/core';
import * as moment from 'moment';

export enum Mode {
  Calendar, Month, Year, Hidden
}

@Component({
  moduleId: module.id,
  selector: 'ct-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements OnInit, OnDestroy {
  numYearsShown = 9;
  halfNumYearsShown = Math.floor(this.numYearsShown / 2);

  public Mode = Mode;
  public date = moment(new Date());
  public dateString = this.date.format("MM/DD/YYYY");
  public months: string[] = [];
  public years: number[] = [];
  public mode: Mode = Mode.Calendar;

  @Input("type") public type:string; 

  constructor(private myElement: ElementRef, private renderer: Renderer) {
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

  ngOnInit() {
    this.renderCalendar();
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
    let date = moment(this.date); //doesn't change
    let d = moment(this.date);

    const headerElement = this.renderer.selectRootElement(".ct-dp-cal-header");
    const calElement = this.renderer.selectRootElement(".ct-dp-cal-body");

    //Add name for day of week
    for (var i = 0; i < 7; i++) {
      d.day(i);
      let el: ElementRef = this.renderer.createElement(headerElement, "div");
      this.renderer.setText(el, d.format("dd"));
      this.renderer.setElementAttribute(el, "ct-cal-dp-day", i.toString());
      this.renderer.setElementClass(el, "ct-dp-cal-day", true);
    }

    d.date(1); //reset date.

    //Add blank filler days.
    for (var i = 0; i < d.day(); i++) {
      let el: ElementRef = this.renderer.createElement(calElement, "div");
      this.renderer.setElementAttribute(el, "ct-dp-cal-day", i.toString());
      this.renderer.setElementClass(el, "ct-dp-cal-day", true);
    }

    //Add calendar
    while (d.month() === date.month()) {
      let component = this;
      let el: ElementRef = this.renderer.createElement(calElement, "button");
      this.renderer.setText(el, (d.date()).toString());
      this.renderer.setElementAttribute(el, "ct-dp-cal-day", d.date().toString());
      this.renderer.setElementAttribute(el, "tabindex", "-1");
      this.renderer.setElementClass(el, "ct-dp-cal-day", true);
      if (d.isSame(this.date, "day")) {
        this.renderer.setElementClass(el, "active", true);
      }
      this.renderer.listen(el, "click", this.dateClickListener(d.date()));
      d.date(d.date() + 1);
    }
  }
  
  dateClickListener(date: number) {
    let component = this;
    return function() {
      component.setDate(date);
    }
  }

  setDate(date: number) {
      this.date.date(date);
      this.renderCalendar();      
      this.dateString = this.date.format("MM/DD/YYYY");
  }
}
