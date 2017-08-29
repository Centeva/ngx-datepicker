import {
    Component, forwardRef, OnChanges, AfterViewInit,
    OnDestroy, ContentChild, ElementRef, OnInit, Renderer, ViewEncapsulation,
    Input, ViewChild, QueryList, Output, EventEmitter
} from '@angular/core';
import * as moment from 'moment';
import * as $ from 'jquery';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendar-mode';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DatePickerBase } from '../common/datepicker-base';

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
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DualPickerComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DualPickerComponent), multi: true }
    ]
})
export class DualPickerComponent extends DatePickerBase implements OnChanges {
    //Enum definitions for access in view
    public CalendarMode = CalendarMode;
    public DualPickerMode = DualPickerMode;

    private _globalMode: CalendarMode = CalendarMode.Calendar;
    /** Set the starting mode for selecting a date. (eg. Calendar, Month, Year) **/
    @Input() set globalMode(val: string) {
        if (CalendarMode.hasOwnProperty(val)) {
            switch (CalendarMode[`${val}`]) {
                case CalendarMode.Calendar:
                case CalendarMode.Year:
                    this._globalMode = CalendarMode[`${val}`]
            }
        }
    }

    /** Date from (binding value) */
    private dateFromValue: moment.Moment;
    /** Date to (binding value) */
    private dateToValue: moment.Moment;
    /** Today's Date to pass into the second picker **/
    private today: moment.Moment = moment();
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
        if (this.isSameDay(val, this.dateFromValue)) {
            return;
        }
        if (val instanceof moment && val.isValid()) {
            this.inputFrom.nativeElement.value = val.format("MM/DD/YYYY");
            val = moment(val.format('YYYY-MM-DD'));
            this.dateFromValue = val
            this.dateFromChange.emit(val);
        } else {
            this.dateFromValue = undefined;
            this.inputFrom.nativeElement.value = "";
        }
        this.propagateChange({ dateFrom: this.dateFrom, dateTo: this.dateTo });
    }
    /** Input definition for (to) */
    @Input()
    get dateTo() {
        return this.dateToValue;
    }
    set dateTo(val) {
        if (this.isSameDay(val, this.dateToValue)) {
            return;
        }
        if (val instanceof moment && val.isValid()) {
            this.inputTo.nativeElement.value = val.format("MM/DD/YYYY");
            val = moment(val.format('YYYY-MM-DD'));
            this.dateToValue = val;
            this.dateToChange.emit(val);
        } else {
            this.dateToValue = undefined;
            this.inputTo.nativeElement.value = "";
        }
        this.propagateChange({ dateFrom: this.dateFrom, dateTo: val });
    }

    /** Cal1 view child component, use to control rendering */
    @ContentChild('dateTo') public inputTo: ElementRef;
    /** Cal2 view child component, use to control rendering */
    @ContentChild('dateFrom') public inputFrom: ElementRef;

    /** Cal1 view child component, use to control rendering */
    @ViewChild('cal1') public cal1: CalendarComponent;
    /** Cal2 view child component, use to control rendering */
    @ViewChild('cal2') public cal2: CalendarComponent;
    /** Mode */
    public mode: DualPickerMode = DualPickerMode.Hidden;

    constructor(private myElement: ElementRef) {
        super();
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
            this.timerId = setTimeout(() => { this.changeGlobalModeFn(mode) }, 400);
        } else {
            this.changeGlobalModeFn(mode);
        }
    }

    private changeGlobalModeFn(mode: DualPickerMode) {
        this.mode = mode;
        switch (this.mode) {
            case DualPickerMode.To:
                $(this.myElement.nativeElement).addClass("ct-dp-active");
                this.positionCalendar(this.inputTo);
                break;
            case DualPickerMode.From:
                $(this.myElement.nativeElement).addClass("ct-dp-active");
                this.positionCalendar(this.inputFrom);
                break;
            case DualPickerMode.Hidden:
                $(this.myElement.nativeElement).removeClass("ct-dp-active");
                this.hideCalendar();
                break;
        }
        this.changeMode(this._globalMode, this.cal1);
        this.changeMode(this._globalMode, this.cal2);
    }

    private positionCalendar(inputElement: ElementRef) {
        let picker = $(this.myElement.nativeElement).find(".ct-dp-picker-wrapper");
        picker.removeClass("invisible");
        let top = $(inputElement.nativeElement).offset().top + $(inputElement.nativeElement).outerHeight();
        let scrollTop = $(window).scrollTop();
        if ($(window).height() < (top - scrollTop) + picker.height()) {
            picker.removeClass("display-below");
            picker.addClass("display-above");
            this.positionCalendarAbove(inputElement, this.inputFrom, picker);
            $(window).on("scroll.datepicker", () => this.positionCalendarAbove(inputElement, this.inputFrom, picker));
        } else {
            picker.removeClass("display-above");
            picker.addClass("display-below");
            this.positionCalendarBelow(inputElement, this.inputFrom, picker);
            $(window).on("scroll.datepicker", () => this.positionCalendarBelow(inputElement, this.inputFrom, picker));
        }
    }

    private positionCalendarAbove(inputElement: ElementRef, leftElement: ElementRef, picker: JQuery) {
        let left = $(inputElement.nativeElement).position().left
        let caret = $(this.myElement.nativeElement).find(".ct-dp-caret");
        caret.css({ "left": (left + (picker.width() * .05)) + "px" });
        
        let offset = $(leftElement.nativeElement).offset();
        picker.css("top", (offset.top - $(window).scrollTop()) - picker.height() + this.PICKER_OFFSET);
        picker.css("left", offset.left - $(window).scrollLeft());
    }

    private positionCalendarBelow(inputElement: ElementRef, leftElement: ElementRef, picker: JQuery) {
        let left = $(inputElement.nativeElement).position().left
        let caret = $(this.myElement.nativeElement).find(".ct-dp-caret");
        caret.css({ "left": (left + (picker.width() * .05)) + "px" });

        let offset = $(leftElement.nativeElement).offset();
        picker.css("top", (offset.top - $(window).scrollTop()) + $(inputElement.nativeElement).outerHeight() - this.PICKER_OFFSET);
        picker.css("left", offset.left - $(window).scrollLeft());
    }

    private hideCalendar() {
        let picker = $(this.myElement.nativeElement).find(".ct-dp-picker-wrapper");
        picker.removeClass("display-above");
        picker.addClass("display-below");
        picker.addClass("invisible");
        $(window).off(".datepicker");
    }

    public onDateFromStringChange(val) {
        let m = moment(new Date(val));
        if (m.isValid()) {
            if (this.dateFromValue === undefined || this.dateFromValue === null) {
                this.dateFromValue = m;
            } else {
                this.dateFromValue.set(m.toObject());
            }
            this.cal1.date = this.dateFromValue;
            this.shiftCal2();
            this.dateFromChange.emit(this.dateFromValue);
            this.renderCalendar();
        }
        this.touched();
    }

    public onDateToStringChange(val) {
        let m = moment(new Date(val));
        if (m.isValid()) {
            if (this.dateToValue === undefined || this.dateToValue === null) {
                this.dateToValue = m;
            } else {
                this.dateToValue.set(m.toObject());
            }
            this.cal2.date = this.dateToValue;
            this.shiftCal1();
            this.dateToChange.emit(this.dateToValue);
            this.renderCalendar();
        }
        this.touched();
    }

    private shiftCal1() {
        this.cal1.date = moment(this.cal2.date);
        this.cal1.date.subtract({ "month": 1 });
    }

    private shiftCal2() {
        this.cal2.date = moment(this.cal1.date);
        this.cal2.date.add({ "month": 1 });
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

    private touched() {
        this.propagateTouched({ dateFrom: this.dateFrom, dateTo: this.dateTo });
    }
    private closePicker(event) {
        if (event.which === 9) {
            this.changeGlobalModeFn(DualPickerMode.Hidden);
            this.touched();
        }
    }

    ngOnInit() {
        this.cal1.initCalendar(this.dateFrom, this.minDate, this.maxDate);
        this.cal2.initCalendar(this.dateFrom, this.minDate, this.maxDate);
        // build what date should be on the second calendar
        this.shiftCal2();

        this.cal1.subscribeToChangeMonth(this.month1ChangeListener);
        this.cal2.subscribeToChangeMonth(this.month2ChangeListener);
        this.cal1.subscribeToChangeYear(this.year1ChangeListener);
        this.cal2.subscribeToChangeYear(this.year2ChangeListener);

        this.changeMode(this._globalMode, this.cal1);
        this.changeMode(this._globalMode, this.cal2);
    }

    ngAfterViewInit() {
        this.renderCalendar();

        this.inputTo.nativeElement.style['z-index'] = this.zIndexVal;
        this.inputFrom.nativeElement.style['z-index'] = this.zIndexVal;

        this.inputFrom.nativeElement.addEventListener('focus', () => { this.changeGlobalMode(DualPickerMode.From) });
        this.inputTo.nativeElement.addEventListener('focus', () => { this.changeGlobalMode(DualPickerMode.To) });

        this.inputFrom.nativeElement.addEventListener('keyup', (event) => { this.onDateFromStringChange(this.inputFrom.nativeElement.value) });
        this.inputFrom.nativeElement.addEventListener('blur', (event) => { this.correctDateTo() });
        this.inputTo.nativeElement.addEventListener('keyup', (event) => { this.onDateToStringChange(this.inputTo.nativeElement.value) });
        this.inputTo.nativeElement.addEventListener('blur', (event) => { this.correctDateFrom() });

        this.inputTo.nativeElement.addEventListener('keydown', (event) => { this.closePicker(event); });
    }

    ngOnChanges(inputs) {
    }

    ngOnDestroy() {

    }

    writeValue(value) {
        if (value) {
            this.dateTo = value.dateTo;
            this.dateFrom = value.dateFrom;
        }
    }

    validate(c: FormControl) {
        if (c.value == null) {
            return "Invalid Value";
        }
        if (!(c.value.dateFrom instanceof moment) || !c.value.dateFrom.isValid()) {
            return "Invalid Date";
        }
        if (this.minDateVal && this.minDateVal.isAfter(c.value.dateFrom)) {
            return "Date cannot be before " + this.minDateVal.format("mm/DD/yyyy");
        }
        if (this.maxDateVal && this.maxDateVal.isBefore(c.value.dateFrom)) {
            return "Date cannot be after " + this.maxDateVal.format("mm/DD/yyyy");
        }
        if (!(c.value.dateTo instanceof moment) || !c.value.dateTo.isValid()) {
            return "Invalid Date";
        }
        if (this.minDateVal && this.minDateVal.isAfter(c.value.dateTo)) {
            return "Date cannot be before " + this.minDateVal.format("mm/DD/yyyy");
        }
        if (this.maxDateVal && this.maxDateVal.isBefore(c.value.dateTo)) {
            return "Date cannot be after " + this.maxDateVal.format("mm/DD/yyyy");
        }
        return null;
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
        this.touched();
        this.renderCalendar();
    }

    private correctDateTo() {
        if (this.dateTo && this.dateFrom.isAfter(this.dateTo)) {
            this.dateTo = moment(this.dateFrom);
        }
    }

    private correctDateFrom() {
        if (this.dateFrom && this.dateFrom.isValid() && this.dateTo.isBefore(this.dateFrom)) {
            this.dateFrom = moment(this.dateTo);
        }
    }

    updateMinDate(minDate: moment.Moment) {
        this.cal1.minDate = minDate;
        this.cal2.minDate = minDate;

        this.cal1.initCalendar(this.dateFrom, this.minDate, this.maxDate);
        this.cal2.initCalendar(this.dateFrom, this.minDate, this.maxDate);
    }
    updateMaxDate(maxDate: moment.Moment) {
        this.cal1.maxDate = maxDate;
        this.cal2.maxDate = maxDate;

        this.cal1.initCalendar(this.dateFrom, this.minDate, this.maxDate);
        this.cal2.initCalendar(this.dateFrom, this.minDate, this.maxDate);
    }
}
