import { AfterViewInit, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendarMode';
export declare enum Mode {
    Calendar = 0,
    Month = 1,
    Year = 2,
    Hidden = 3,
}
export declare enum Type {
    Text = 0,
    DoubleText = 1,
}
export declare class DatePickerComponent implements AfterViewInit, OnDestroy, OnInit {
    private myElement;
    private renderer;
    numYearsShown: number;
    halfNumYearsShown: number;
    Mode: typeof Mode;
    Type: typeof Type;
    cal1: CalendarComponent;
    private iType;
    type: Type;
    dateString: string;
    constructor(myElement: ElementRef, renderer: Renderer);
    changeMode(mode: CalendarMode): void;
    goPrev(): void;
    goNext(): void;
    setMonth(index: number): void;
    setYear(year: number): void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    generateYearData(year: number): void;
    generateMonthData(): void;
    renderCalendar(): void;
    dateClickListener: (date: moment.Moment) => () => void;
    setDate(date: moment.Moment): void;
}
