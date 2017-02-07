import {
  Component, forwardRef, OnChanges, AfterViewInit,
  OnDestroy, ContentChild, ElementRef, OnInit, Renderer, ViewEncapsulation,
  Input, ViewChild, QueryList, Output, EventEmitter
} from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendar-mode';
import * as $ from 'jquery';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DatePickerBase } from '../common/datepicker-base';

export enum DatePickerMode {
  Visible, Hidden
}

@Component({
  selector: 'ct-date-picker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.less', '../common/common.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DatePickerComponent), multi: true }
  ]
})
export class DatePickerComponent extends DatePickerBase implements AfterViewInit, OnDestroy, OnInit, ControlValueAccessor, OnChanges {
  /** Enum Accessors for HTML */
  public CalendarMode = CalendarMode;
  public DatePickerMode = DatePickerMode;

  @Output() dateChange = new EventEmitter();
  private dateValue: moment.Moment;
  @Input()
  get date() {
    return this.dateValue;
  }
  set date(val) {
    if (val instanceof moment && val.isValid()) {
      this.input.nativeElement.value = val.format("MM/DD/YYYY");
      this.dateValue = val;
      this.dateChange.emit(val);
    }
    this.propagateChange(val);
  }

  @ContentChild('date') input: ElementRef;

  @ViewChild(CalendarComponent) public cal: CalendarComponent;
  public mode: DatePickerMode = DatePickerMode.Hidden;

  constructor(private myElement: ElementRef, private renderer: Renderer) {
    super();
  }

  public onDateStringChange(val) {
    let m = moment(new Date(val));
    this.dateValue.set(m.toObject());
    this.dateChange.emit(this.dateValue);
    if (m.isValid()) {
      this.cal.date = this.dateValue;
    } else {
      this.cal.date = moment();
    }
    this.propagateChange(val);
    this.renderCalendar();
  }

  public changeGlobalMode(mode: DatePickerMode) {
    this.mode = mode;
    switch (this.mode) {
      case DatePickerMode.Visible:
        this.changeMode(CalendarMode.Calendar);
        $(this.myElement.nativeElement).addClass("ct-dp-active");
        break;
      case DatePickerMode.Hidden:
        $(this.myElement.nativeElement).removeClass("ct-dp-active");
    }
  }

  private touched() {
    this.propagateTouched(this.date);
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
    if (this.date instanceof moment && this.date.isValid()) {
      this.cal.date = moment(this.date);
    } else {
      this.cal.date = moment();
    }
    this.cal.subscribeToChangeMonth(this.monthChangeListener);
    this.cal.subscribeToChangeYear(this.yearChangeListener);
  }

  ngOnChanges(inputs) {
    console.log('ngOnChanges');
  }

  ngAfterViewInit() {
    this.renderCalendar();

    this.input.nativeElement.style['z-index'] = this.zIndexVal;
    this.input.nativeElement.addEventListener('focus', () => { this.changeGlobalMode(DatePickerMode.Visible) });
    this.input.nativeElement.addEventListener('keyup', (event) => { this.onDateStringChange(this.input.nativeElement.value) });
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
        this.touched();
        this.date = date;
        this.changeGlobalMode(DatePickerMode.Hidden);
        break;
    }
    this.renderCalendar();
  }

  ngOnDestroy() {

  }

  renderCalendar() {
    this.cal.renderCalendar(this.dateClickListener, this.date, this.date, this.minDateVal, this.maxDateVal);
  }

  writeValue(value) {
    if (value) {
      this.date = value;
    }
  }

  validate(c: FormControl) {
    if (!(c.value instanceof moment) || !c.value.isValid()) {
      return "Invalid Date";
    }
    if (this.minDateVal && this.minDateVal.isAfter(c.value)) {
      return "Date cannot be before " + this.minDateVal.format("mm/DD/yyyy");
    }
    if (this.maxDateVal && this.maxDateVal.isBefore(c.value)) {
      return "Date cannot be after " + this.maxDateVal.format("mm/DD/yyyy");
    }
    return null;
  }
}