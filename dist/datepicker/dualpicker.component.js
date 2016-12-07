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
var DualPickerComponent = (function () {
    function DualPickerComponent(myElement, renderer) {
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
    DualPickerComponent.prototype.changeGlobalMode = function (mode) {
        this.globalMode = mode;
        switch (this.globalMode) {
            case GlobalMode.To:
            case GlobalMode.From:
                this.changeMode(calendarMode_1.CalendarMode.Calendar, this.cal1);
                this.changeMode(calendarMode_1.CalendarMode.Calendar, this.cal2);
                break;
        }
    };
    DualPickerComponent.prototype.blur = function (event) {
        if ((event.which || event.keyCode) == 9) {
            this.changeGlobalMode(GlobalMode.Hidden);
        }
    };
    DualPickerComponent.prototype.changeMode = function (mode, picker) {
        picker.mode = mode;
        switch (picker.mode) {
            case calendarMode_1.CalendarMode.Calendar:
                this.renderCalendar();
            case calendarMode_1.CalendarMode.Year:
                picker.generateYearData(picker.date.year());
                break;
        }
    };
    DualPickerComponent.prototype.goPrev = function () {
        if (this.cal1.mode == calendarMode_1.CalendarMode.Calendar && this.cal2.mode == calendarMode_1.CalendarMode.Calendar) {
            this.cal1.date.month(this.cal1.date.month() - 1);
            this.cal2.date = moment(this.cal1.date);
            this.cal2.date.add({ month: 1 });
            this.renderCalendar();
        }
        else {
            this.cal1.goPrev();
            this.cal2.goPrev();
        }
    };
    DualPickerComponent.prototype.goNext = function () {
        if (this.cal1.mode == calendarMode_1.CalendarMode.Calendar && this.cal2.mode == calendarMode_1.CalendarMode.Calendar) {
            this.cal1.date.month(this.cal1.date.month() + 1);
            this.cal2.date = moment(this.cal1.date);
            this.cal2.date.add({ month: 1 });
            this.renderCalendar();
        }
        else {
            this.cal1.goNext();
            this.cal2.goNext();
        }
    };
    DualPickerComponent.prototype.setMonth = function (index, is1) {
        if (is1) {
            this.cal1.date.month(index);
            this.cal2.date = moment(this.cal1.date);
            this.cal2.date.add({ month: 1 });
        }
        else {
            this.cal1.date.month(index - 1);
            this.cal1.date = moment(this.cal2.date);
            this.cal1.date.subtract({ month: 1 });
        }
        this.changeMode(calendarMode_1.CalendarMode.Calendar, this.cal1);
        this.changeMode(calendarMode_1.CalendarMode.Calendar, this.cal2);
    };
    DualPickerComponent.prototype.setYear = function (year, is1) {
        if (is1) {
            this.cal1.date.year(year);
            this.cal2.date = moment(this.cal2.date);
            this.cal2.date.add({ month: 1 });
        }
        else {
            this.cal2.date.year(year);
            this.cal1.date = moment(this.cal2.date);
            this.cal1.date.subtract({ month: 1 });
        }
        this.changeMode(calendarMode_1.CalendarMode.Calendar, this.cal1);
        this.changeMode(calendarMode_1.CalendarMode.Calendar, this.cal2);
    };
    DualPickerComponent.prototype.ngOnInit = function () {
        this.cal1.date = moment(new Date());
        this.cal2.date = moment(this.cal2.date);
        this.cal2.date.add({ month: 1 });
    };
    DualPickerComponent.prototype.ngAfterViewInit = function () {
        this.renderCalendar();
    };
    DualPickerComponent.prototype.ngOnDestroy = function () {
    };
    DualPickerComponent.prototype.renderCalendar = function () {
        this.cal1.renderCalendar(this.dateClickListener, this.dateTo, this.dateFrom);
        this.cal2.renderCalendar(this.dateClickListener, this.dateTo, this.dateFrom);
    };
    DualPickerComponent.prototype.setDate = function (date) {
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
        core_1.ViewChild('cal1', calendar_component_1.CalendarComponent), 
        __metadata('design:type', calendar_component_1.CalendarComponent)
    ], DualPickerComponent.prototype, "cal1", void 0);
    __decorate([
        core_1.ViewChild('cal2', calendar_component_1.CalendarComponent), 
        __metadata('design:type', calendar_component_1.CalendarComponent)
    ], DualPickerComponent.prototype, "cal2", void 0);
    DualPickerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ct-dualpicker',
            templateUrl: 'dualpicker.component.html',
            styleUrls: ['datepicker.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DualPickerComponent);
    return DualPickerComponent;
}());
exports.DualPickerComponent = DualPickerComponent;
//# sourceMappingURL=dualpicker.component.js.map