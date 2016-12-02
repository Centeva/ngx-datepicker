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
(function (Mode) {
    Mode[Mode["Calendar"] = 0] = "Calendar";
    Mode[Mode["Month"] = 1] = "Month";
    Mode[Mode["Year"] = 2] = "Year";
    Mode[Mode["Hidden"] = 3] = "Hidden";
})(exports.Mode || (exports.Mode = {}));
var Mode = exports.Mode;
var DatePickerComponent = (function () {
    function DatePickerComponent(myElement, renderer) {
        this.myElement = myElement;
        this.renderer = renderer;
        this.numYearsShown = 9;
        this.halfNumYearsShown = Math.floor(this.numYearsShown / 2);
        this.Mode = Mode;
        this.date = moment(new Date());
        this.dateString = this.date.format("MM/DD/YYYY");
        this.months = [];
        this.years = [];
        this.mode = Mode.Calendar;
        this.generateMonthData();
    }
    DatePickerComponent.prototype.changeMode = function (mode) {
        this.mode = mode;
        switch (this.mode) {
            case Mode.Calendar:
                this.renderCalendar();
            case Mode.Year:
                this.generateYearData(this.date.year());
                break;
        }
    };
    DatePickerComponent.prototype.goPrev = function () {
        switch (this.mode) {
            case Mode.Calendar:
                this.date.month(this.date.month() - 1);
                this.renderCalendar();
                break;
            case Mode.Month:
                break;
            case Mode.Year:
                this.generateYearData(this.years[this.halfNumYearsShown] - this.numYearsShown);
                break;
        }
    };
    DatePickerComponent.prototype.goNext = function () {
        switch (this.mode) {
            case Mode.Calendar:
                this.date.month(this.date.month() + 1);
                this.renderCalendar();
                break;
            case Mode.Month:
                break;
            case Mode.Year:
                this.generateYearData(this.years[this.halfNumYearsShown] + this.numYearsShown);
                break;
        }
    };
    DatePickerComponent.prototype.setMonth = function (index) {
        this.date.month(index);
        this.changeMode(Mode.Calendar);
    };
    DatePickerComponent.prototype.setYear = function (year) {
        this.date.year(year);
        this.changeMode(Mode.Calendar);
    };
    DatePickerComponent.prototype.ngOnInit = function () {
        this.renderCalendar();
    };
    DatePickerComponent.prototype.ngOnDestroy = function () {
    };
    DatePickerComponent.prototype.generateYearData = function (year) {
        this.years = [];
        var y = year - this.halfNumYearsShown;
        for (var i = 0; i < this.numYearsShown; i++) {
            this.years.push(y + i);
        }
    };
    DatePickerComponent.prototype.generateMonthData = function () {
        var date = moment(this.date);
        var d = moment(this.date);
        d.month(0);
        while (date.year() === d.year()) {
            this.months.push(d.format("MMM"));
            d.month(d.month() + 1);
        }
    };
    DatePickerComponent.prototype.renderCalendar = function () {
        var date = moment(this.date);
        var d = moment(this.date);
        var headerElement = this.renderer.selectRootElement(".ct-dp-cal-header");
        var calElement = this.renderer.selectRootElement(".ct-dp-cal-body");
        for (var i = 0; i < 7; i++) {
            d.day(i);
            var el = this.renderer.createElement(headerElement, "div");
            this.renderer.setText(el, d.format("dd"));
            this.renderer.setElementAttribute(el, "ct-cal-dp-day", i.toString());
            this.renderer.setElementClass(el, "ct-dp-cal-day", true);
        }
        d.date(1);
        for (var i = 0; i < d.day(); i++) {
            var el = this.renderer.createElement(calElement, "div");
            this.renderer.setElementAttribute(el, "ct-dp-cal-day", i.toString());
            this.renderer.setElementClass(el, "ct-dp-cal-day", true);
        }
        while (d.month() === date.month()) {
            var component = this;
            var el = this.renderer.createElement(calElement, "button");
            this.renderer.setText(el, (d.date()).toString());
            this.renderer.setElementAttribute(el, "ct-dp-cal-day", d.date().toString());
            this.renderer.setElementAttribute(el, "tabindex", "-1");
            this.renderer.setElementClass(el, "ct-dp-cal-day", true);
            if (d.isSame(this.date, "day")) {
                this.renderer.setElementClass(el, "active", true);
            }
            this.renderer.listen(el, "click", this.dateClickListener(d.date()));
            d.date(d.date() + 1);
        }
    };
    DatePickerComponent.prototype.dateClickListener = function (date) {
        var component = this;
        return function () {
            component.setDate(date);
        };
    };
    DatePickerComponent.prototype.setDate = function (date) {
        this.date.date(date);
        this.renderCalendar();
        this.dateString = this.date.format("MM/DD/YYYY");
    };
    __decorate([
        core_1.Input("type"), 
        __metadata('design:type', String)
    ], DatePickerComponent.prototype, "type", void 0);
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