import { Component, OnInit, OnDestroy, ElementRef, Renderer, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CalendarMode } from '../common/calendarMode';
import { CalendarGridComponent } from '../calendarGrid/calendarGrid.component';

@Component({
    moduleId: module.id,
    selector: 'ct-calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnDestroy {
    private static numYearsShown = 9;
    private static halfNumYearsShown = Math.floor(CalendarComponent.numYearsShown / 2);

    public CalendarMode = CalendarMode;
    public mode: CalendarMode = CalendarMode.Calendar;
    public date: moment.Moment;

    private months: string[] = [];
    private years: number[] = [];
    private monthListeners: Function[] = [];
    private yearListeners: Function[] = [];

    @ViewChild(CalendarGridComponent) public grid: CalendarGridComponent;

    constructor() {
        this.generateMonthData();
    }

    ngOnInit() { }
    ngOnDestroy() { }

    subscribeToChangeMonth(listener: Function) {
        this.monthListeners.push(listener);
    }

    subscribeToChangeYear(listener: Function) {
        this.yearListeners.push(listener);
    }

    changeMode(mode: CalendarMode) {
        this.mode = mode;
        switch (mode) {
            case CalendarMode.Year:
                this.generateYearData(this.date.year());
                break;
        }
    }

    private generateMonthData() {
        let date = moment(new Date()); //doesn't change
        date.month(0);
        let d = moment(new Date());
        d.month(0);
        while (date.year() === d.year()) {
            this.months.push(d.format("MMM"));
            d.month(d.month() + 1);
        }
    }

    private generateYearData(year: number) {
        this.years = [];
        let y = year - CalendarComponent.halfNumYearsShown;
        for (var i = 0; i < CalendarComponent.numYearsShown; i++) {
            this.years.push(y + i);
        }
    }

    goPrev() {
        switch (this.mode) {
            case CalendarMode.Calendar:
                break;
            case CalendarMode.Month:
                break;
            case CalendarMode.Year:
                this.generateYearData(this.years[CalendarComponent.halfNumYearsShown] - CalendarComponent.numYearsShown);
        }
    }

    goNext() {
        switch (this.mode) {
            case CalendarMode.Calendar:
                break;
            case CalendarMode.Month:
                break;
            case CalendarMode.Year:
                this.generateYearData(this.years[CalendarComponent.halfNumYearsShown] + CalendarComponent.numYearsShown);
        }
    }

    renderCalendar(clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment) {
        this.grid.renderCalendar(this, clickCallback, dateTo, dateFrom);
    }

    setMonth(index: number) {
        this.date.month(index);
        for (let fn of this.monthListeners) {
            fn();
        }
    }

    setYear(year: number) {
        this.date.year(year);
        for (let fn of this.yearListeners) {
            fn();
        }
    }
}
