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
  }
  @Input('maxDate') set maxDate(val: any) {
    let d = moment(val);
    if (d.isValid()) {
      this.maxDateVal = moment(val);
    }
    else {
      this.maxDateVal = null;
    }
  }

  public registerOnChange(fn) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn) {
    this.propagateTouched = fn;
  }

  public abstract writeValue(value: any);
}