import { AfterViewInit, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendar-mode';
export declare enum DualPickerMode {
    To = 0,
    From = 1,
    Hidden = 2,
}
export declare class DualPickerComponent implements AfterViewInit, OnDestroy, OnInit {
    CalendarMode: typeof CalendarMode;
    DualPickerMode: typeof DualPickerMode;
    private dateFromValue;
    private dateToValue;
    dateFromChange: EventEmitter<{}>;
    dateToChange: EventEmitter<{}>;
    dateFrom: moment.Moment;
    dateTo: moment.Moment;
    dateFromString: string;
    dateToString: string;
    cal1: CalendarComponent;
    cal2: CalendarComponent;
    mode: DualPickerMode;
    constructor();
    changeGlobalMode(mode: DualPickerMode): void;
    onDateFromStringChange(val: any): void;
    onDateToStringChange(val: any): void;
    private shiftCal1();
    private shiftCal2();
    blur(event: any): void;
    changeMode(mode: CalendarMode, cal: CalendarComponent): void;
    goPrev(): void;
    goNext(): void;
    private month1ChangeListener;
    private month2ChangeListener;
    private year1ChangeListener;
    private year2ChangeListener;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    renderCalendar(): void;
    dateClickListener: (date: moment.Moment) => () => void;
    setDate(date: moment.Moment): void;
    private correctDateTo();
    private correctDateFrom();
}
