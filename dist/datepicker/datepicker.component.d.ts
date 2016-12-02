import { OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import * as moment from 'moment';
export declare enum Mode {
    Calendar = 0,
    Month = 1,
    Year = 2,
    Hidden = 3,
}
export declare class DatePickerComponent implements OnInit, OnDestroy {
    private myElement;
    private renderer;
    numYearsShown: number;
    halfNumYearsShown: number;
    Mode: typeof Mode;
    date: moment.Moment;
    dateString: string;
    months: string[];
    years: number[];
    mode: Mode;
    type: string;
    constructor(myElement: ElementRef, renderer: Renderer);
    changeMode(mode: Mode): void;
    goPrev(): void;
    goNext(): void;
    setMonth(index: number): void;
    setYear(year: number): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    generateYearData(year: number): void;
    generateMonthData(): void;
    renderCalendar(): void;
    dateClickListener(date: number): () => void;
    setDate(date: number): void;
}
