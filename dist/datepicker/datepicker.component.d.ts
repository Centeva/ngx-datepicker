import { AfterViewInit, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { Picker } from './dualpicker.component';
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
export declare class DatePickerComponent extends Picker implements AfterViewInit, OnDestroy, OnInit {
    private myElement;
    private renderer;
    numYearsShown: number;
    halfNumYearsShown: number;
    Mode: typeof Mode;
    Type: typeof Type;
    cal1: CalendarComponent;
    private iType;
    type: Type;
    constructor(myElement: ElementRef, renderer: Renderer);
    changeMode(mode: Mode): void;
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
    dateClickListener: (date: number) => () => void;
    setDate(date: number): void;
}
