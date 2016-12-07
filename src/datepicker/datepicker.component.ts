import { Component, AfterViewInit, OnDestroy, ElementRef, OnInit, Renderer, ViewEncapsulation, Input, ViewChild, QueryList } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendarMode';

export enum GlobalMode {
    To, From, Hidden
}

@Component({
    moduleId: module.id,
    selector: 'ct-datepicker',
    templateUrl: 'datepicker.component.html',
    styleUrls: ['datepicker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements AfterViewInit, OnDestroy, OnInit {


    public CalendarMode = CalendarMode;
    public GlobalMode = GlobalMode;

    public dateTo: moment.Moment;
    public dateFrom: moment.Moment;
    public dateToString: string;
    public dateFromString: string;

    @ViewChild(CalendarComponent) public cal: CalendarComponent;
    public globalMode: GlobalMode = GlobalMode.From;

    constructor(private myElement: ElementRef, private renderer: Renderer) {

    }

    public changeGlobalMode(mode: GlobalMode) {
        this.globalMode = mode;
        switch (this.globalMode) {
            case GlobalMode.To:
            case GlobalMode.From:
                this.changeMode(CalendarMode.Calendar);
                break;
        }
    }

    public blur(event) {
        if ((event.which || event.keyCode) == 9) {
            this.changeGlobalMode(GlobalMode.Hidden);
        }
    }

    public changeMode(mode: CalendarMode) {
        this.cal.mode = mode;
        switch (this.cal.mode) {
            case CalendarMode.Calendar:
                this.renderCalendar();
            case CalendarMode.Year:
                this.cal.generateYearData(this.cal.date.year());
                break;
        }
    }

    public goPrev() {
        if (this.cal.mode == CalendarMode.Calendar) {
            this.cal.date.month(this.cal.date.month() - 1);
            this.renderCalendar();
        } else {
            this.cal.goPrev();
        }
    }

    public goNext() {
        if (this.cal.mode == CalendarMode.Calendar) {
            this.cal.date.month(this.cal.date.month() + 1);
            this.renderCalendar();
        } else {
            this.cal.goNext();
        }
    }

    ngOnInit() {
        this.cal.date = moment(new Date());
    }

    ngAfterViewInit() {
        this.renderCalendar();
    }

    ngOnDestroy() {

    }

    renderCalendar() {
        this.cal.renderCalendar(this.dateClickListener, this.dateTo, this.dateFrom);
    }

    dateClickListener = (date: moment.Moment) => {
        let d = moment(date);
        return () => {
            this.setDate(d);
        }
    }

    setDate(date: moment.Moment) {
        switch (this.globalMode) {
            case GlobalMode.From:
                this.dateFrom = date;
                this.dateFromString = date.format("MM/DD/YYYY");
                if (this.dateTo && this.dateFrom.isAfter(this.dateTo)) {
                    this.dateTo = moment(this.dateFrom);
                    this.dateTo.add({ "day": 1 });
                    this.dateToString = this.dateTo.format("MM/DD/YYYY");
                }
                this.changeGlobalMode(GlobalMode.To);
                break;
            case GlobalMode.To:
                this.dateTo = date;
                this.dateToString = date.format("MM/DD/YYYY");
                if (this.dateFrom && this.dateTo.isBefore(this.dateFrom)) {
                    this.dateFrom = moment(this.dateTo);
                    this.dateFrom.subtract({ "day": 1 });
                    this.dateFromString = this.dateFrom.format("MM/DD/YYYY");
                }
                this.changeGlobalMode(GlobalMode.Hidden);
                break;
        }
        this.renderCalendar();
    }

}
