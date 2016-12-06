/// <reference types="core-js" />
import { OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import * as moment from 'moment';
import { Picker } from './dualpicker.component';
export declare class CalendarComponent implements OnInit, OnDestroy {
    private myElement;
    private renderer;
    constructor(myElement: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    renderCalendar(picker: Picker, clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment): void;
}
