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

export abstract class DatePickerBase implements ControlValueAccessor {
  /** Enum Accessors for HTML */
  public CalendarMode = CalendarMode;

  readonly PICKER_OFFSET = 5;

  /** Validation Functions */
  propagateChange: any = () => { };
  propagateTouched: any = () => { };
  validateFn: any = () => { };

  shadowZIndex: number = 100;
  zIndexVal: number = 101;
  @Input('zIndex') set zIndex(val: number) {
    this.shadowZIndex = val;
    this.zIndexVal = val + 1.0;
  }

  minDateVal: moment.Moment = null;
  maxDateVal: moment.Moment = null;
  @Input('minDate') set minDate(val: any) {
    let d = moment(val);
    if (d.isValid()) {
      this.minDateVal = moment(val);
    }
    else {
      this.minDateVal = null;
    }
    this.updateMinDate(this.minDateVal);
  } get minDate() { return this.minDateVal }
  @Input('maxDate') set maxDate(val: any) {
    let d = moment(val);
    if (d.isValid()) {
      this.maxDateVal = moment(val);
    }
    else {
      this.maxDateVal = null;
    }
    this.updateMaxDate(this.maxDateVal);    
  } get maxDate() { return this.maxDateVal }

  public registerOnChange(fn) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  public isSameDay(date1:(moment.Moment|any), date2:(moment.Moment|any)) {
    if (date1 instanceof moment && date2 instanceof moment) {
      return date1.isSame(date2, 'day');
    }
    return date1 === date2;
  }

  public abstract writeValue(value: any);
  abstract updateMinDate(minDate: moment.Moment);
  abstract updateMaxDate(maxDate: moment.Moment);
}