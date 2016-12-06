import { Component, AfterViewInit, OnDestroy, ElementRef, OnInit, Renderer, ViewEncapsulation, Input, ViewChild, QueryList } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from './calendar.component';

export enum Mode {
    Calendar, Month, Year
}

export enum GlobalMode {
    Visible, Hidden
}

export enum Type {
    Text,
    DoubleText
}

export class Picker {
    numYearsShown = 9;
    halfNumYearsShown = Math.floor(this.numYearsShown / 2);

    public months: string[] = [];
    public years: number[] = [];
    public mode: Mode = Mode.Calendar;
    public date: moment.Moment;
    public dateString: string;

    constructor() {
        this.generateMonthData();
    }

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
            case Mode.Calendar:
                break;
            case Mode.Month:
                break;
            case Mode.Year:
                this.generateYearData(this.years[this.halfNumYearsShown] - this.numYearsShown);
        }
    }

    goNext() {
        switch (this.mode) {
            case Mode.Calendar:
                break;
            case Mode.Month:
                break;
            case Mode.Year:
                this.generateYearData(this.years[this.halfNumYearsShown] + this.numYearsShown);
        }
    }
}

@Component({
    moduleId: module.id,
    selector: 'ct-dualpicker',
    templateUrl: 'dualpicker.component.html',
    styleUrls: ['dualpicker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DualPickerComponent implements AfterViewInit, OnDestroy, OnInit {


    public Mode = Mode;
    public Type = Type;
    public GlobalMode = GlobalMode;

    public picker1 = new Picker();
    public picker2 = new Picker();

    @ViewChild('cal1', CalendarComponent) public cal1: CalendarComponent;
    @ViewChild('cal2', CalendarComponent) public cal2: CalendarComponent;
    @Input("type") private iType: string;
    public type: Type;
    public globalMode: GlobalMode;

    constructor(private myElement: ElementRef, private renderer: Renderer) {
        this.picker1.date = moment(new Date());
        this.picker2.date = moment(this.picker2.date);
        this.picker2.date.add({ month: 1 });
    }

    public changeGlobalMode(mode: GlobalMode) {
        this.globalMode = mode;
        switch (this.globalMode) {
            case GlobalMode.Visible:
                this.changeMode(Mode.Calendar, this.picker1);
                this.changeMode(Mode.Calendar, this.picker2);
                break;
        }
    }

    public changeMode(mode: Mode, picker: Picker) {
        picker.mode = mode;
        switch (picker.mode) {
            case Mode.Calendar:
                this.renderCalendar();
            case Mode.Year:
                picker.generateYearData(picker.date.year());
                break;
        }
    }

    public goPrev() {
        if (this.picker1.mode == Mode.Calendar && this.picker2.mode == Mode.Calendar) {
            this.picker1.date.month(this.picker1.date.month() - 1);
            this.picker2.date.month(this.picker1.date.month() + 1);
            this.renderCalendar();
        } else {
            this.picker1.goPrev();
            this.picker2.goPrev();
        }
    }

    public goNext() {
        if (this.picker1.mode == Mode.Calendar && this.picker2.mode == Mode.Calendar) {
            this.picker1.date.month(this.picker1.date.month() + 1);
            this.picker2.date.month(this.picker1.date.month() + 1);
            this.renderCalendar();
        } else {
            this.picker1.goNext();
            this.picker2.goNext();
        }
    }

    public setMonth(index: number, is1: boolean) {
        if (is1) {
            this.picker1.date.month(index);
            this.picker2.date = moment(this.picker1.date)
            this.picker2.date.add({ month: 1 });
        } else {
            this.picker1.date.month(index - 1);
            this.picker1.date = moment(this.picker2.date)
            this.picker1.date.subtract({ month: 1 });
        }
        this.changeMode(Mode.Calendar, this.picker1);
        this.changeMode(Mode.Calendar, this.picker2);
    }

    public setYear(year: number, is1: boolean) {
        if (is1) {
            this.picker1.date.year(year);
            this.picker2.date = moment(this.picker1.date)
            this.picker2.date.add({ month: 1 });
        } else {
            this.picker2.date.year(year);
            this.picker1.date = moment(this.picker2.date)
            this.picker1.date.subtract({ month: 1 });
        }
        this.changeMode(Mode.Calendar, this.picker1);
        this.changeMode(Mode.Calendar, this.picker2);
    }

    ngOnInit() {
        let iType = this.iType.toLowerCase();
        if (iType === "text") {
            this.type = Type.Text
        } else if (iType === "doubletext") {
            this.type = Type.DoubleText
        }
    }

    ngAfterViewInit() {
        this.renderCalendar();
    }

    ngOnDestroy() {

    }

    renderCalendar() {
        this.cal1.renderCalendar(this.picker1, this.dateClickListener);
        this.cal2.renderCalendar(this.picker2, this.dateClickListener);
    }

    dateClickListener = (date: number, picker: Picker) => {
        return () => {
            this.setDate(date, picker);
        }
    }

    setDate(date: number, picker: Picker) {
        picker.date.date(date);
        this.renderCalendar();
        picker.dateString = picker.date.format("MM/DD/YYYY");
    }
}
