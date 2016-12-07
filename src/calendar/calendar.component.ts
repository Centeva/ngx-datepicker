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
    numYearsShown = 9;
    halfNumYearsShown = Math.floor(this.numYearsShown / 2);

    public CalendarMode = CalendarMode;

    public months: string[] = [];
    public years: number[] = [];
    public mode: CalendarMode = CalendarMode.Calendar;
    public date: moment.Moment;

    @ViewChild(CalendarGridComponent) public grid: CalendarGridComponent;

    constructor() {
        this.generateMonthData();
    }

    ngOnInit() { }
    ngOnDestroy() { }

    generateMonthData() {
        let date = moment(new Date()); //doesn't change
        date.month(0);
        let d = moment(new Date());
        d.month(0);
        while (date.year() === d.year()) {
            this.months.push(d.format("MMM"));
            d.month(d.month() + 1);
        }
    }

    generateYearData(year: number) {
        this.years = [];
        let y = year - this.halfNumYearsShown;
        for (var i = 0; i < this.numYearsShown; i++) {
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
                this.generateYearData(this.years[this.halfNumYearsShown] - this.numYearsShown);
        }
    }

    goNext() {
        switch (this.mode) {
            case CalendarMode.Calendar:
                break;
            case CalendarMode.Month:
                break;
            case CalendarMode.Year:
                this.generateYearData(this.years[this.halfNumYearsShown] + this.numYearsShown);
        }
    }

    renderCalendar(clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment) {
        this.grid.renderCalendar(this, clickCallback, dateTo, dateFrom);
    }
}
