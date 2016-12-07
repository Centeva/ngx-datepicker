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
(function (GlobalMode) {
    GlobalMode[GlobalMode["To"] = 0] = "To";
    GlobalMode[GlobalMode["From"] = 1] = "From";
    GlobalMode[GlobalMode["Hidden"] = 2] = "Hidden";
})(exports.GlobalMode || (exports.GlobalMode = {}));
var GlobalMode = exports.GlobalMode;
var DatePickerComponent = (function () {
    function DatePickerComponent(myElement, renderer) {
        var _this = this;
        this.myElement = myElement;
        this.renderer = renderer;
        this.CalendarMode = calendarMode_1.CalendarMode;
        this.GlobalMode = GlobalMode;
        this.globalMode = GlobalMode.From;
        this.dateClickListener = function (date) {
            var d = moment(date);
            return function () {
                _this.setDate(d);
            };
        };
    }
    DatePickerComponent.prototype.changeGlobalMode = function (mode) {
        this.globalMode = mode;
        switch (this.globalMode) {
            case GlobalMode.To:
            case GlobalMode.From:
                this.changeMode(calendarMode_1.CalendarMode.Calendar);
                break;
        }
    };
    DatePickerComponent.prototype.blur = function (event) {
        if ((event.which || event.keyCode) == 9) {
            this.changeGlobalMode(GlobalMode.Hidden);
        }
    };
    DatePickerComponent.prototype.changeMode = function (mode) {
        this.cal.mode = mode;
        switch (this.cal.mode) {
            case calendarMode_1.CalendarMode.Calendar:
                this.renderCalendar();
            case calendarMode_1.CalendarMode.Year:
                this.cal.generateYearData(this.cal.date.year());
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
    };
    DatePickerComponent.prototype.ngAfterViewInit = function () {
        this.renderCalendar();
    };
    DatePickerComponent.prototype.ngOnDestroy = function () {
    };
    DatePickerComponent.prototype.renderCalendar = function () {
        this.cal.renderCalendar(this.dateClickListener, this.dateTo, this.dateFrom);
    };
    DatePickerComponent.prototype.setDate = function (date) {
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
            styleUrls: ['datepicker.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DatePickerComponent);
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=datepicker.component.js.map