/// <reference types="core-js" />
import { OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
export declare class CalendarGridComponent implements OnInit, OnDestroy {
    private myElement;
    private renderer;
    constructor(myElement: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    renderCalendar(cal: CalendarComponent, clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment): void;
    renderCalendar2(cal: CalendarComponent, clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment): void;
}
