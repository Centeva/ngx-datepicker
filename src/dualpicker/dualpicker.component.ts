import { Component, AfterViewInit, ContentChild, OnDestroy, OnInit, Renderer, ViewEncapsulation, Input, ViewChild, QueryList, Output, EventEmitter, ElementRef } from '@angular/core';
import * as moment from 'moment';
import * as $ from 'jquery';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendar-mode';

/** 
 * Defines the mode of the picker
 */
export enum DualPickerMode {
    /** Allows selection of the to date. */
    To,
    /** Allows selection of the from date. */
    From,
    /** Makes the picker hidden, default state. */
    Hidden
}

@Component({
    selector: 'ct-dual-picker',
    templateUrl: 'dualpicker.component.html',
    styleUrls: ['dualpicker.component.less', '../common/common.less'],
    encapsulation: ViewEncapsulation.None
})
export class DualPickerComponent {
    //Enum definitions for access in view
    public CalendarMode = CalendarMode;
    public DualPickerMode = DualPickerMode;

    /** Date from (binding value) */
    private dateFromValue: moment.Moment;
    /** Date to (binding value) */
    private dateToValue: moment.Moment;
    /** Emitter for change (from)*/
    @Output() dateFromChange = new EventEmitter();
    /** Emitter for change (to) */
    @Output() dateToChange = new EventEmitter();
    /** Input definition for (from) */
    @Input()
    get dateFrom() {
        return this.dateFromValue;
    }
    set dateFrom(val) {
        if (val instanceof moment && val.isValid()) {
            this.inputFrom.nativeElement.value = val.format("MM/DD/YYYY");
            this.dateFromValue = val;
            this.dateFromChange.emit(val);
        }
    }
    /** Input definition for (to) */
    @Input()
    get dateTo() {
        return this.dateToValue;
    }
    set dateTo(val) {
        if (val instanceof moment && val.isValid()) {
            this.inputTo.nativeElement.value = val.format("MM/DD/YYYY");
            this.dateToValue = val;
            this.dateToChange.emit(val);
        }
    }
    @Input("ctDisabled") disabled: boolean = false;
    @Input() inputClass: any;

    shadowZIndex: number = 100;
    zIndexVal: number = 101;
    @Input('zIndex') set zIndex(val: number) {
        this.shadowZIndex = val;
        this.zIndexVal = val + 1.0;
    }

    /** Cal1 view child component, use to control rendering */
    @ContentChild('dateTo', CalendarComponent) public inputTo: ElementRef;
    /** Cal2 view child component, use to control rendering */
    @ContentChild('dateFrom', CalendarComponent) public inputFrom: ElementRef;

    /** Cal1 view child component, use to control rendering */
    @ViewChild('cal1', CalendarComponent) public cal1: CalendarComponent;
    /** Cal2 view child component, use to control rendering */
    @ViewChild('cal2', CalendarComponent) public cal2: CalendarComponent;
    /** Mode */
    public mode: DualPickerMode = DualPickerMode.Hidden;

    constructor(private myElement: ElementRef) {

    }

    /**
     * Changes the global mode of the picker (not the mode of the calendar)
     */
    private timerId = null;
    public changeGlobalMode(mode: DualPickerMode, delay: boolean = false) {
        if (this.timerId != null) {
            clearTimeout(this.timerId);
        }
        if (delay) {
            this.timerId = setTimeout(() => {this.changeGlobalModeFn(mode)}, 400);
        } else {
            this.changeGlobalModeFn(mode);
        }
    }

    private changeGlobalModeFn(mode: DualPickerMode) {
        this.mode = mode;
        switch (this.mode) {
            case DualPickerMode.To:
                let l = $(this.inputTo.nativeElement).position().left;
                $(this.myElement.nativeElement).find(".ct-dp-caret").css({ "left": l });
                $(this.myElement.nativeElement).addClass("ct-dp-active");
                break;
            case DualPickerMode.From:
                let lfrom = $(this.inputFrom.nativeElement).position().left;
                $(this.myElement.nativeElement).find(".ct-dp-caret").css({ "left": lfrom });
                $(this.myElement.nativeElement).addClass("ct-dp-active");
                break;
            case DualPickerMode.Hidden:
                $(this.myElement.nativeElement).removeClass("ct-dp-active");
                break;
        }
        this.changeMode(CalendarMode.Calendar, this.cal1);
        this.changeMode(CalendarMode.Calendar, this.cal2);
    }

    public onDateFromStringChange(val) {
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

        this.inputTo.nativeElement.style['z-index'] = this.zIndexVal;
        this.inputFrom.nativeElement.style['z-index'] = this.zIndexVal;

        this.inputFrom.nativeElement.addEventListener('focus', () => { this.changeGlobalMode(DualPickerMode.From) });
        this.inputTo.nativeElement.addEventListener('focus', () => { this.changeGlobalMode(DualPickerMode.To) });

        this.inputFrom.nativeElement.addEventListener('blur', (event) => { this.blur(event) });
        this.inputTo.nativeElement.addEventListener('blur', (event) => { this.blur(event) });

        this.inputFrom.nativeElement.addEventListener('keyup', (event) => { this.onDateFromStringChange(this.inputFrom.nativeElement.value) });
        this.inputTo.nativeElement.addEventListener('keyup', (event) => { this.onDateToStringChange(this.inputTo.nativeElement.value) });
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
                this.correctDateTo();
                this.changeGlobalMode(DualPickerMode.To);
                break;
            case DualPickerMode.To:
                this.dateTo = date;
                this.correctDateFrom();
                this.changeGlobalMode(DualPickerMode.Hidden, true);
                break;
        }
        this.renderCalendar();
    }

    private correctDateTo() {
        if (this.dateTo && this.dateFrom.isAfter(this.dateTo)) {
            this.dateTo = moment(this.dateFrom);
            this.dateTo.add({ "day": 1 });
        }
    }

    private correctDateFrom() {
        if (this.dateFrom && this.dateTo.isBefore(this.dateFrom)) {
            this.dateFrom = moment(this.dateTo);
            this.dateFrom.subtract({ "day": 1 });
        }
    }
}
