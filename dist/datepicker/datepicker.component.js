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
(function (DatePickerMode) {
    DatePickerMode[DatePickerMode["Visible"] = 0] = "Visible";
    DatePickerMode[DatePickerMode["Hidden"] = 1] = "Hidden";
})(exports.DatePickerMode || (exports.DatePickerMode = {}));
var DatePickerMode = exports.DatePickerMode;
var DatePickerComponent = (function () {
    function DatePickerComponent(myElement, renderer) {
        var _this = this;
        this.myElement = myElement;
        this.renderer = renderer;
        this.CalendarMode = calendarMode_1.CalendarMode;
        this.DatePickerMode = DatePickerMode;
        this.mode = DatePickerMode.Hidden;
        this.dateClickListener = function (date) {
            var d = moment(date);
            return function () {
                _this.setDate(d);
            };
        };
        this.monthChangeListener = function () {
            _this.changeMode(calendarMode_1.CalendarMode.Calendar);
        };
        this.yearChangeListener = function () {
            _this.changeMode(calendarMode_1.CalendarMode.Calendar);
        };
    }
    DatePickerComponent.prototype.changeGlobalMode = function (mode) {
        this.mode = mode;
        switch (this.mode) {
            case DatePickerMode.Visible:
                this.changeMode(calendarMode_1.CalendarMode.Calendar);
                break;
        }
    };
    DatePickerComponent.prototype.blur = function (event) {
        if ((event.which || event.keyCode) == 9) {
            this.changeGlobalMode(DatePickerMode.Hidden);
        }
    };
    DatePickerComponent.prototype.changeMode = function (mode) {
        this.cal.changeMode(mode);
        switch (mode) {
            case calendarMode_1.CalendarMode.Calendar:
                this.renderCalendar();
                break;
        }
    };
    DatePickerComponent.prototype.goPrev = function () {
        if (this.cal.mode == calendarMode_1.CalendarMode.Calendar) {
            this.cal.date.month(this.cal.date.month() - 1);
            this.renderCalendar();
        }
        else {
            this.cal.goPrev();
        }
    };
    DatePickerComponent.prototype.goNext = function () {
        if (this.cal.mode == calendarMode_1.CalendarMode.Calendar) {
            this.cal.date.month(this.cal.date.month() + 1);
            this.renderCalendar();
        }
        else {
            this.cal.goNext();
        }
    };
    DatePickerComponent.prototype.ngOnInit = function () {
        this.cal.date = moment(new Date());
        this.cal.subscribeToChangeMonth(this.monthChangeListener);
        this.cal.subscribeToChangeYear(this.yearChangeListener);
    };
    DatePickerComponent.prototype.ngAfterViewInit = function () {
        this.renderCalendar();
    };
    DatePickerComponent.prototype.ngOnDestroy = function () {
    };
    DatePickerComponent.prototype.renderCalendar = function () {
        this.cal.renderCalendar(this.dateClickListener, this.date, this.date);
    };
    DatePickerComponent.prototype.setDate = function (date) {
        switch (this.mode) {
            case DatePickerMode.Visible:
                this.date = date;
                this.dateString = date.format("MM/DD/YYYY");
                this.changeGlobalMode(DatePickerMode.Hidden);
                break;
        }
        this.renderCalendar();
    };
    __decorate([
        core_1.ViewChild(calendar_component_1.CalendarComponent), 
        __metadata('design:type', calendar_component_1.CalendarComponent)
    ], DatePickerComponent.prototype, "cal", void 0);
    DatePickerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ct-datepicker',
            templateUrl: 'datepicker.component.html',
            styleUrls: ['datepicker.component.css', '../common/common.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DatePickerComponent);
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=datepicker.component.js.map