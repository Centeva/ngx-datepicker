/// <reference types="core-js" />
import { OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { CalendarMode } from '../common/calendarMode';
import { CalendarGridComponent } from '../calendarGrid/calendarGrid.component';
export declare class CalendarComponent implements OnInit, OnDestroy {
    private static numYearsShown;
    private static halfNumYearsShown;
    CalendarMode: typeof CalendarMode;
    mode: CalendarMode;
    date: moment.Moment;
    private months;
    private years;
    private monthListeners;
    private yearListeners;
    grid: CalendarGridComponent;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    subscribeToChangeMonth(listener: Function): void;
    subscribeToChangeYear(listener: Function): void;
    changeMode(mode: CalendarMode): void;
    private generateMonthData();
    private generateYearData(year);
    goPrev(): void;
    goNext(): void;
    renderCalendar(clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment): void;
    setMonth(index: number): void;
    setYear(year: number): void;
}
