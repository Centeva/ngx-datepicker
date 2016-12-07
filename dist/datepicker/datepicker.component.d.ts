import { AfterViewInit, OnDestroy, ElementRef, OnInit, Renderer } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendarMode';
export declare enum GlobalMode {
    To = 0,
    From = 1,
    Hidden = 2,
}
export declare class DatePickerComponent implements AfterViewInit, OnDestroy, OnInit {
    private myElement;
    private renderer;
    CalendarMode: typeof CalendarMode;
    GlobalMode: typeof GlobalMode;
    dateTo: moment.Moment;
    dateFrom: moment.Moment;
    dateToString: string;
    dateFromString: string;
    cal: CalendarComponent;
    globalMode: GlobalMode;
    constructor(myElement: ElementRef, renderer: Renderer);
    changeGlobalMode(mode: GlobalMode): void;
    blur(event: any): void;
    changeMode(mode: CalendarMode): void;
    goPrev(): void;
    goNext(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    renderCalendar(): void;
    dateClickListener: (date: moment.Moment) => () => void;
    setDate(date: moment.Moment): void;
}
