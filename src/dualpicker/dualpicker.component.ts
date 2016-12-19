import { Component, AfterViewInit, OnDestroy, ElementRef, OnInit, Renderer, ViewEncapsulation, Input, ViewChild, QueryList, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendar-mode';

export enum DualPickerMode {
    To, From, Hidden
}

@Component({
    moduleId: module.id,
    selector: 'ct-dualpicker',
    templateUrl: 'dualpicker.component.html',
    styleUrls: ['dualpicker.component.css', '../common/common.css']
})
export class DualPickerComponent implements AfterViewInit, OnDestroy, OnInit {


    public CalendarMode = CalendarMode;
    public DualPickerMode = DualPickerMode;

    private dateFromValue: moment.Moment;
    private dateToValue: moment.Moment;
    @Output() dateFromChange = new EventEmitter();
    @Output() dateToChange = new EventEmitter();
    @Input()
    get dateFrom() {
        return this.dateFromValue;
    }
    set dateFrom(val) {
        this.dateFromString = val.format("MM/DD/YYYY");
        this.dateFromValue = val;
        this.dateFromChange.emit(val);
    }
    @Input()
    get dateTo() {
        return this.dateToValue;
    }
    set dateTo(val) {
        this.dateToString = val.format("MM/DD/YYYY");
        this.dateToValue = val;
        this.dateToChange.emit(val);
    }
    public dateFromString: string;
    public dateToString: string;

    @ViewChild('cal1', CalendarComponent) public cal1: CalendarComponent;
    @ViewChild('cal2', CalendarComponent) public cal2: CalendarComponent;
    public mode: DualPickerMode = DualPickerMode.Hidden;

    constructor() {

    }

    public changeGlobalMode(mode: DualPickerMode) {
        this.mode = mode;
        switch (this.mode) {
            case DualPickerMode.To:
            case DualPickerMode.From:
                this.changeMode(CalendarMode.Calendar, this.cal1);
                this.changeMode(CalendarMode.Calendar, this.cal2);
                break;
        }
    }

    public onDateFromStringChange(val) {
        this.dateFromString = val;
        let m = moment(new Date(val));
        if (m.isValid()) {
            this.dateFromValue.set(m.toObject());
            this.correctDateTo();
            this.cal1.date = this.dateFromValue;
            this.shiftCal2();
            this.dateFromChange.emit(this.dateFromValue);
            this.renderCalendar();
        }
    }

    public onDateToStringChange(val) {
        this.dateToString = val;
        let m = moment(new Date(val));
        if (m.isValid()) {
            this.dateToValue.set(m.toObject());
            this.correctDateFrom();
            this.cal2.date = this.dateToValue;
            this.shiftCal1();
            this.dateToChange.emit(this.dateToValue);
            this.renderCalendar();
        }
    }

    private shiftCal1() {
        this.cal1.date = moment(this.cal2.date);
        this.cal1.date.subtract({ "month": 1 });
    }

    private shiftCal2() {
        this.cal2.date = moment(this.cal1.date);
        this.cal2.date.add({ "month": 1 });
    }

    public blur(event) {
        if ((event.which || event.keyCode) == 9) {
            this.changeGlobalMode(DualPickerMode.Hidden);
        }
    }

    public changeMode(mode: CalendarMode, cal: CalendarComponent) {
        cal.changeMode(mode);
        switch (mode) {
            case CalendarMode.Calendar:
                this.renderCalendar();
                break;
        }
    }

    public goPrev() {
        if (this.cal1.mode == CalendarMode.Calendar && this.cal2.mode == CalendarMode.Calendar) {
            this.cal1.date.month(this.cal1.date.month() - 1);
            this.shiftCal2();
            this.renderCalendar();
        } else {
            this.cal1.goPrev();
            this.cal2.goPrev();
        }
    }

    public goNext() {
        if (this.cal1.mode == CalendarMode.Calendar && this.cal2.mode == CalendarMode.Calendar) {
            this.cal1.date.month(this.cal1.date.month() + 1);
            this.shiftCal2();
            this.renderCalendar();
        } else {
            this.cal1.goNext();
            this.cal2.goNext();
        }
    }

    private month1ChangeListener = () => {
        this.shiftCal2();
        this.changeMode(CalendarMode.Calendar, this.cal1);
        this.changeMode(CalendarMode.Calendar, this.cal2);
    }

    private month2ChangeListener = () => {
        this.shiftCal1();
        this.changeMode(CalendarMode.Calendar, this.cal1);
        this.changeMode(CalendarMode.Calendar, this.cal2);
    }

    private year1ChangeListener = () => {
        this.shiftCal2();
        this.changeMode(CalendarMode.Calendar, this.cal1);
        this.changeMode(CalendarMode.Calendar, this.cal2);
    }

    private year2ChangeListener = () => {
        this.shiftCal1();
        this.changeMode(CalendarMode.Calendar, this.cal1);
        this.changeMode(CalendarMode.Calendar, this.cal2);
    }

    ngOnInit() {
        this.cal1.date = moment(this.dateFrom);
        this.shiftCal2();

        this.cal1.subscribeToChangeMonth(this.month1ChangeListener);
        this.cal2.subscribeToChangeMonth(this.month2ChangeListener);
        this.cal1.subscribeToChangeYear(this.year1ChangeListener);
        this.cal2.subscribeToChangeYear(this.year2ChangeListener);
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
        switch (this.mode) {
            case DualPickerMode.From:
                this.dateFrom = date;
                this.dateFromString = date.format("MM/DD/YYYY");
                this.correctDateTo();
                this.changeGlobalMode(DualPickerMode.To);
                break;
            case DualPickerMode.To:
                this.dateTo = date;
                this.dateToString = date.format("MM/DD/YYYY");
                this.correctDateFrom();
                this.changeGlobalMode(DualPickerMode.Hidden);
                break;
        }
        this.renderCalendar();
    }

    private correctDateTo() {
        if (this.dateTo && this.dateFrom.isAfter(this.dateTo)) {
            this.dateTo = moment(this.dateFrom);
            this.dateTo.add({ "day": 1 });
            this.dateToString = this.dateTo.format("MM/DD/YYYY");
        }
    }

    private correctDateFrom() {
        if (this.dateFrom && this.dateTo.isBefore(this.dateFrom)) {
            this.dateFrom = moment(this.dateTo);
            this.dateFrom.subtract({ "day": 1 });
            this.dateFromString = this.dateFrom.format("MM/DD/YYYY");
        }
    }

}
