"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var moment = require('moment');
var calendar_component_1 = require('../calendar/calendar.component');
var calendarMode_1 = require('../common/calendarMode');
(function (Mode) {
    Mode[Mode["Calendar"] = 0] = "Calendar";
    Mode[Mode["Month"] = 1] = "Month";
    Mode[Mode["Year"] = 2] = "Year";
    Mode[Mode["Hidden"] = 3] = "Hidden";
})(exports.Mode || (exports.Mode = {}));
var Mode = exports.Mode;
(function (Type) {
    Type[Type["Text"] = 0] = "Text";
    Type[Type["DoubleText"] = 1] = "DoubleText";
})(exports.Type || (exports.Type = {}));
var Type = exports.Type;
var DatePickerComponent = (function () {
    function DatePickerComponent(myElement, renderer) {
        var _this = this;
        this.myElement = myElement;
        this.renderer = renderer;
        this.numYearsShown = 9;
        this.halfNumYearsShown = Math.floor(this.numYearsShown / 2);
        this.Mode = Mode;
        this.Type = Type;
        this.dateClickListener = function (date) {
            var d = moment(date);
            return function () {
                _this.setDate(d);
            };
        };
    }
    DatePickerComponent.prototype.changeMode = function (mode) {
        this.cal1.mode = mode;
        switch (this.cal1.mode) {
            case calendarMode_1.CalendarMode.Calendar:
                this.renderCalendar();
            case calendarMode_1.CalendarMode.Year:
                this.generateYearData(this.cal1.date.year());
                break;
        }
    };
    DatePickerComponent.prototype.goPrev = function () {
        switch (this.cal1.mode) {
            case calendarMode_1.CalendarMode.Calendar:
                this.cal1.date.month(this.cal1.date.month() - 1);
                this.renderCalendar();
                break;
            case calendarMode_1.CalendarMode.Month:
                break;
            case calendarMode_1.CalendarMode.Year:
                this.generateYearData(this.cal1.years[this.halfNumYearsShown] - this.numYearsShown);
                break;
        }
    };
    DatePickerComponent.prototype.goNext = function () {
        switch (this.cal1.mode) {
            case calendarMode_1.CalendarMode.Calendar:
                this.cal1.date.month(this.cal1.date.month() + 1);
                this.renderCalendar();
                break;
            case calendarMode_1.CalendarMode.Month:
                break;
            case calendarMode_1.CalendarMode.Year:
                this.generateYearData(this.cal1.years[this.halfNumYearsShown] + this.numYearsShown);
                break;
        }
    };
    DatePickerComponent.prototype.setMonth = function (index) {
        this.cal1.date.month(index);
        this.changeMode(calendarMode_1.CalendarMode.Calendar);
    };
    DatePickerComponent.prototype.setYear = function (year) {
        this.cal1.date.year(year);
        this.changeMode(calendarMode_1.CalendarMode.Calendar);
    };
    DatePickerComponent.prototype.ngAfterViewInit = function () {
        this.renderCalendar();
    };
    DatePickerComponent.prototype.ngOnInit = function () {
        var iType = this.iType.toLowerCase();
        if (iType === "text") {
            this.type = Type.Text;
        }
        else if (iType === "doubletext") {
            this.type = Type.DoubleText;
        }
        this.cal1.date = moment(new Date());
        this.generateMonthData();
    };
    DatePickerComponent.prototype.ngOnDestroy = function () {
    };
    DatePickerComponent.prototype.generateYearData = function (year) {
        this.cal1.years = [];
        var y = year - this.halfNumYearsShown;
        for (var i = 0; i < this.numYearsShown; i++) {
            this.cal1.years.push(y + i);
        }
    };
    DatePickerComponent.prototype.generateMonthData = function () {
        var date = moment(this.cal1.date);
        var d = moment(this.cal1.date);
        d.month(0);
        while (date.year() === d.year()) {
            this.cal1.months.push(d.format("MMM"));
            d.month(d.month() + 1);
        }
    };
    DatePickerComponent.prototype.renderCalendar = function () {
        this.cal1.renderCalendar(this.dateClickListener, this.cal1.date, this.cal1.date);
    };
    DatePickerComponent.prototype.setDate = function (date) {
        this.cal1.date = date;
        this.renderCalendar();
        this.dateString = this.cal1.date.format("MM/DD/YYYY");
    };
    __decorate([
        core_1.ViewChild(calendar_component_1.CalendarComponent), 
        __metadata('design:type', calendar_component_1.CalendarComponent)
    ], DatePickerComponent.prototype, "cal1", void 0);
    __decorate([
        core_1.Input("type"), 
        __metadata('design:type', String)
    ], DatePickerComponent.prototype, "iType", void 0);
    DatePickerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ct-datepicker',
            templateUrl: 'datepicker.component.html',
            styleUrls: ['datepicker.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DatePickerComponent);
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=datepicker.component.js.map