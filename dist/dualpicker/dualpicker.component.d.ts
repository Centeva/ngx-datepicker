import { AfterViewInit, OnDestroy, ElementRef, OnInit, Renderer } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendarMode';
export declare enum DualPickerMode {
    To = 0,
    From = 1,
    Hidden = 2,
}
export declare class DualPickerComponent implements AfterViewInit, OnDestroy, OnInit {
    private myElement;
    private renderer;
    CalendarMode: typeof CalendarMode;
    DualPickerMode: typeof DualPickerMode;
    dateTo: moment.Moment;
    dateFrom: moment.Moment;
    dateToString: string;
    dateFromString: string;
    cal1: CalendarComponent;
    cal2: CalendarComponent;
    mode: DualPickerMode;
    constructor(myElement: ElementRef, renderer: Renderer);
    changeGlobalMode(mode: DualPickerMode): void;
    blur(event: any): void;
    changeMode(mode: CalendarMode, cal: CalendarComponent): void;
    goPrev(): void;
    goNext(): void;
    setMonth(index: number, is1: boolean): void;
    setYear(year: number, is1: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    renderCalendar(): void;
    dateClickListener: (date: moment.Moment) => () => void;
    setDate(date: moment.Moment): void;
}
