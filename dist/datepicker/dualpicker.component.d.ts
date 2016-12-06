import { AfterViewInit, OnDestroy, ElementRef, OnInit, Renderer } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from './calendar.component';
export declare enum Mode {
    Calendar = 0,
    Month = 1,
    Year = 2,
}
export declare enum GlobalMode {
    Visible = 0,
    Hidden = 1,
}
export declare enum Type {
    Text = 0,
    DoubleText = 1,
}
export declare class Picker {
    numYearsShown: number;
    halfNumYearsShown: number;
    months: string[];
    years: number[];
    mode: Mode;
    date: moment.Moment;
    dateString: string;
    constructor();
    generateMonthData(): void;
    generateYearData(year: number): void;
    goPrev(): void;
    goNext(): void;
}
export declare class DualPickerComponent implements AfterViewInit, OnDestroy, OnInit {
    private myElement;
    private renderer;
    Mode: typeof Mode;
    Type: typeof Type;
    GlobalMode: typeof GlobalMode;
    picker1: Picker;
    picker2: Picker;
    cal1: CalendarComponent;
    cal2: CalendarComponent;
    private iType;
    type: Type;
    globalMode: GlobalMode;
    constructor(myElement: ElementRef, renderer: Renderer);
    changeGlobalMode(mode: GlobalMode): void;
    changeMode(mode: Mode, picker: Picker): void;
    goPrev(): void;
    goNext(): void;
    setMonth(index: number, is1: boolean): void;
    setYear(year: number, is1: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    renderCalendar(): void;
    dateClickListener: (date: number, picker: Picker) => () => void;
    setDate(date: number, picker: Picker): void;
}
