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

  displayFormatVal: string = null;
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
  @Input('displayFormat') set displayFormat(val: string) {
    this.displayFormatVal = val;
  } get displayFormat() { return this.displayFormatVal }
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

  public twoDigitYearShim(date:(moment.Moment|any), rawValue:string){
    //When the user is entering a two digit year, we have problems in IE where it figures the year is 1900.
    //I.E. if you enter 18, it thinks it is 1918.  When we may want the value to be 2018.  This is only in IE.  Chrome doesn't have this issue
    //So we will want to date the date, and if it is more than 50 years from the current date, then change to be the current century.
    if(rawValue && date){
      let regExMatch = rawValue.match(/[\/,-](\d{2})$/);
      if(regExMatch){
        let rawYear = regExMatch[1];
        let dateYear = date.format('YY');
        let yearDiff = moment().diff(date, 'years');
        //If the year we pulled from the regex is the year in the date, and it is more than 50 years old, then bring it up to this century
        if(rawYear === dateYear && yearDiff>50){
          date.add(100,'years');
        }
      }
   }
    return date;
  }
  public abstract writeValue(value: any);
  public formatDisplayDate(input: ElementRef, date: any){
    //If we have been given a date, and we have a Display Format to use, then set the input box to have this date
    if(date && date instanceof moment && date.isValid() && this.displayFormatVal){
      input.nativeElement.value = date.format(this.displayFormatVal);

    }
  }
  abstract updateMinDate(minDate: moment.Moment);
  abstract updateMaxDate(maxDate: moment.Moment);
}