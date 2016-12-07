import { Component, AfterViewInit, OnDestroy, ElementRef, OnInit, Renderer, ViewEncapsulation, Input, ViewChild, QueryList } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendarMode';

export enum GlobalMode {
    To, From, Hidden
}

export enum Type {
    Text,
    DoubleText
}

@Component({
    moduleId: module.id,
    selector: 'ct-dualpicker',
    templateUrl: 'dualpicker.component.html',
    styleUrls: ['datepicker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DualPickerComponent implements AfterViewInit, OnDestroy, OnInit {


    public CalendarMode = CalendarMode;
    public Type = Type;
    public GlobalMode = GlobalMode;

    public dateTo: moment.Moment;
    public dateFrom: moment.Moment;
    public dateToString: string;
    public dateFromString: string;

    @ViewChild('cal1', CalendarComponent) public cal1: CalendarComponent;
    @ViewChild('cal2', CalendarComponent) public cal2: CalendarComponent;
    @Input("type") private iType: string;
    public type: Type;
    public globalMode: GlobalMode = GlobalMode.From;

    constructor(private myElement: ElementRef, private renderer: Renderer) {

    }

    public changeGlobalMode(mode: GlobalMode) {
        this.globalMode = mode;
        switch (this.globalMode) {
            case GlobalMode.To:
            case GlobalMode.From:
                this.changeMode(CalendarMode.Calendar, this.cal1);
                this.changeMode(CalendarMode.Calendar, this.cal2);
                break;
        }
    }

    public blur(event) {
        if ((event.which || event.keyCode) == 9) {
            this.changeGlobalMode(GlobalMode.Hidden);
        }
    }

    public changeMode(mode: CalendarMode, picker: CalendarComponent) {
        picker.mode = mode;
        switch (picker.mode) {
            case CalendarMode.Calendar:
                this.renderCalendar();
            case CalendarMode.Year:
                picker.generateYearData(picker.date.year());
                break;
        }
    }

    public goPrev() {
        if (this.cal1.mode == CalendarMode.Calendar && this.cal2.mode == CalendarMode.Calendar) {
            this.cal1.date.month(this.cal1.date.month() - 1);
            this.cal2.date = moment(this.cal1.date)
            this.cal2.date.add({ month: 1 });
            this.renderCalendar();
        } else {
            this.cal1.goPrev();
            this.cal2.goPrev();
        }
    }

    public goNext() {
        if (this.cal1.mode == CalendarMode.Calendar && this.cal2.mode == CalendarMode.Calendar) {
            this.cal1.date.month(this.cal1.date.month() + 1);
            this.cal2.date = moment(this.cal1.date)
            this.cal2.date.add({ month: 1 });
            this.renderCalendar();
        } else {
            this.cal1.goNext();
            this.cal2.goNext();
        }
    }

    public setMonth(index: number, is1: boolean) {
        if (is1) {
            this.cal1.date.month(index);
            this.cal2.date = moment(this.cal1.date)
            this.cal2.date.add({ month: 1 });
        } else {
            this.cal1.date.month(index - 1);
            this.cal1.date = moment(this.cal2.date)
            this.cal1.date.subtract({ month: 1 });
        }
        this.changeMode(CalendarMode.Calendar, this.cal1);
        this.changeMode(CalendarMode.Calendar, this.cal2);
    }

    public setYear(year: number, is1: boolean) {
        if (is1) {
            this.cal1.date.year(year);
            this.cal2.date = moment(this.cal2.date)
            this.cal2.date.add({ month: 1 });
        } else {
            this.cal2.date.year(year);
            this.cal1.date = moment(this.cal2.date)
            this.cal1.date.subtract({ month: 1 });
        }
        this.changeMode(CalendarMode.Calendar, this.cal1);
        this.changeMode(CalendarMode.Calendar, this.cal2);
    }

    ngOnInit() {
        let iType = this.iType.toLowerCase();
        if (iType === "text") {
            this.type = Type.Text
        } else if (iType === "doubletext") {
            this.type = Type.DoubleText
        }

        this.cal1.date = moment(new Date());
        this.cal2.date = moment(this.cal2.date);
        this.cal2.date.add({ month: 1 });
    }

    ngAfterViewInit() {
        this.renderCalendar();
    }

    ngOnDestroy() {

    }

    renderCalendar() {
        this.cal1.renderCalendar(this.dateClickListener, this.dateTo, this.dateFrom);
        this.cal2.renderCalendar(this.dateClickListener, this.dateTo, this.dateFrom);
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
