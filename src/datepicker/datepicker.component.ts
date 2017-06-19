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
export class DatePickerComponent extends DatePickerBase implements AfterViewInit, OnDestroy, OnInit, OnChanges {
  /** Enum Accessors for HTML */
  public CalendarMode = CalendarMode;
  public DatePickerMode = DatePickerMode;

  private _globalMode: CalendarMode = CalendarMode.Calendar;
  /** Set the starting mode for selecting a date. (eg. Calendar, Month, Year) **/
  @Input() set globalMode(val: string) { 
    if (CalendarMode.hasOwnProperty(val)) {
      switch(CalendarMode[`${val}`]) {
        case CalendarMode.Calendar:
        case CalendarMode.Year:
          this._globalMode = CalendarMode[`${val}`]
      }
    }
  }
  private dateValue: moment.Moment;
  @Input()
  get date() {
    return this.dateValue;
  }
  set date(val) {
    if (this.isSameDate(val, this.dateValue)) {
      return;
    }
    if (val instanceof moment && val.isValid()) {
      this.input.nativeElement.value = val.format("MM/DD/YYYY");
      val = moment(val.format('YYYY-MM-DD')+'T12:00:00.0Z');
      this.dateValue = val;
      this.dateChange.emit(val);
    }else {
      this.dateValue = undefined;
      this.input.nativeElement.value = "";
    }
    this.propagateChange(val);
  }
  private validDateExpression: RegExp;
  @Input()
  get match() {
    return this.validDateExpression || /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/;
  }
  set match(val) {
    this.validDateExpression = new RegExp(val);
  }
  @Output() dateChange = new EventEmitter();
  
  @ContentChild('date') input: ElementRef;

  @ViewChild(CalendarComponent) public cal: CalendarComponent;
  public mode: DatePickerMode = DatePickerMode.Hidden;

  constructor(private myElement: ElementRef, private renderer: Renderer) {
    super();
  }

  public onDateStringChange(val) {
    if (this.match.test(val)) {
      let m = moment(new Date(val));

      if (this.dateValue === undefined || this.dateValue === null) { this.dateValue = m; }
      else { this.dateValue.set(m.toObject()); }

      this.dateChange.emit(this.dateValue);
      if (m.isValid()) {
        this.cal.date = this.dateValue;
      } else {
        this.cal.date = moment();
      }
    } else {
      this.propagateChange(val);
    }
    this.touched();
  }

  public changeGlobalMode(mode: DatePickerMode) {
    this.mode = mode;
    switch (this.mode) {
      case DatePickerMode.Visible:
        this.changeMode(this._globalMode);
        $(this.myElement.nativeElement).addClass("ct-dp-active");
        this.positionCalendar();
        break;
      case DatePickerMode.Hidden:
        this.hideCalendar();
        $(this.myElement.nativeElement).removeClass("ct-dp-active");
    }
  }

  private positionCalendar() {
    let picker = $(this.myElement.nativeElement).find(".ct-dp-picker-wrapper");
    picker.removeClass("hidden");
    let top = $(this.input.nativeElement).offset().top + $(this.input.nativeElement).outerHeight();
    let scrollTop = $(window).scrollTop();
    if ($(window).height() < (top - scrollTop) + picker.height()) {
      this.positionCalendarAbove();
    } else {
      this.positionCalendarBelow();
    }
  }

  private positionCalendarAbove() {
    let picker = $(this.myElement.nativeElement).find(".ct-dp-picker-wrapper");
    picker.removeClass("display-below");        
    picker.addClass("display-above");
    picker.css("top", (-picker.height()) + "px");
    picker.css("left", "0px");
  }

  private positionCalendarBelow() {
    let picker = $(this.myElement.nativeElement).find(".ct-dp-picker-wrapper");
    picker.removeClass("display-above");        
    picker.addClass("display-below");
    picker.css("top", ($(this.input.nativeElement).height()) + "px");
    picker.css("left", "0px"); 
  }

  private hideCalendar() {
    let picker = $(this.myElement.nativeElement).find(".ct-dp-picker-wrapper");    
    picker.removeClass("display-above");
    picker.addClass("display-below");
    picker.addClass("hidden");
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

  private closePicker(event) {
    if (event.which === 9) {
      this.changeGlobalMode(DatePickerMode.Hidden);
    }
  }

  ngOnInit() {
    if (this.date instanceof moment && this.date.isValid()) {
      this.cal.date = moment(this.date);
    } else {
      this.cal.date = moment();
    }

    this.cal.minDate = this.minDate;
    this.cal.maxDate = this.maxDate;

    this.cal.subscribeToChangeMonth(this.monthChangeListener);
    this.cal.subscribeToChangeYear(this.yearChangeListener);
  }

  ngOnChanges(inputs) {
    // console.log('ngOnChanges');
  }

  ngAfterViewInit() {
    this.renderCalendar();
    this.input.nativeElement.style['z-index'] = this.zIndexVal;
    this.input.nativeElement.addEventListener('focus', () => { this.changeGlobalMode(DatePickerMode.Visible) });
    this.input.nativeElement.addEventListener('keyup', (event) => { this.onDateStringChange(this.input.nativeElement.value) });
    this.input.nativeElement.addEventListener('keydown', (event) => { this.closePicker(event); });
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