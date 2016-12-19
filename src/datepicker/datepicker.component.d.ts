import { AfterViewInit, OnDestroy, ElementRef, OnInit, Renderer, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendar-mode';
export declare enum DatePickerMode {
    Visible = 0,
    Hidden = 1,
}
export declare class DatePickerComponent implements AfterViewInit, OnDestroy, OnInit {
    private myElement;
    private renderer;
    CalendarMode: typeof CalendarMode;
    DatePickerMode: typeof DatePickerMode;
    dateChange: EventEmitter<{}>;
    private dateValue;
    date: moment.Moment;
    dateString: string;
    cal: CalendarComponent;
    mode: DatePickerMode;
    constructor(myElement: ElementRef, renderer: Renderer);
    onDateStringChange(val: any): void;
    changeGlobalMode(mode: DatePickerMode): void;
    blur(event: any): void;
    changeMode(mode: CalendarMode): void;
    goPrev(): void;
    goNext(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    renderCalendar(): void;
    dateClickListener: (date: moment.Moment) => () => void;
    private monthChangeListener;
    private yearChangeListener;
    setDate(date: moment.Moment): void;
}
