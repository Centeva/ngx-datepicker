/// <reference types="core-js" />
import { OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { CalendarMode } from '../common/calendarMode';
import { CalendarGridComponent } from '../calendarGrid/calendarGrid.component';
export declare class CalendarComponent implements OnInit, OnDestroy {
    numYearsShown: number;
    halfNumYearsShown: number;
    CalendarMode: typeof CalendarMode;
    months: string[];
    years: number[];
    mode: CalendarMode;
    date: moment.Moment;
    grid: CalendarGridComponent;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    generateMonthData(): void;
    generateYearData(year: number): void;
    goPrev(): void;
    goNext(): void;
    renderCalendar(clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment): void;
}
