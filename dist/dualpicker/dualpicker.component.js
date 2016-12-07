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
(function (DualPickerMode) {
    DualPickerMode[DualPickerMode["To"] = 0] = "To";
    DualPickerMode[DualPickerMode["From"] = 1] = "From";
    DualPickerMode[DualPickerMode["Hidden"] = 2] = "Hidden";
})(exports.DualPickerMode || (exports.DualPickerMode = {}));
var DualPickerMode = exports.DualPickerMode;
var DualPickerComponent = (function () {
    function DualPickerComponent(myElement, renderer) {
        var _this = this;
        this.myElement = myElement;
        this.renderer = renderer;
        this.CalendarMode = calendarMode_1.CalendarMode;
        this.DualPickerMode = DualPickerMode;
        this.dateFromChange = new core_1.EventEmitter();
        this.dateToChange = new core_1.EventEmitter();
        this.mode = DualPickerMode.Hidden;
        this.month1ChangeListener = function () {
            _this.shiftCal2();
            _this.changeMode(calendarMode_1.CalendarMode.Calendar, _this.cal1);
            _this.changeMode(calendarMode_1.CalendarMode.Calendar, _this.cal2);
        };
        this.month2ChangeListener = function () {
            _this.shiftCal1();
            _this.changeMode(calendarMode_1.CalendarMode.Calendar, _this.cal1);
            _this.changeMode(calendarMode_1.CalendarMode.Calendar, _this.cal2);
        };
        this.year1ChangeListener = function () {
            _this.shiftCal2();
            _this.changeMode(calendarMode_1.CalendarMode.Calendar, _this.cal1);
            _this.changeMode(calendarMode_1.CalendarMode.Calendar, _this.cal2);
        };
        this.year2ChangeListener = function () {
            _this.shiftCal1();
            _this.changeMode(calendarMode_1.CalendarMode.Calendar, _this.cal1);
            _this.changeMode(calendarMode_1.CalendarMode.Calendar, _this.cal2);
        };
        this.dateClickListener = function (date) {
            var d = moment(date);
            return function () {
                _this.setDate(d);
            };
        };
    }
    Object.defineProperty(DualPickerComponent.prototype, "dateFrom", {
        get: function () {
            return this.dateFromValue;
        },
        set: function (val) {
            this.dateFromString = val.format("MM/DD/YYYY");
            this.dateFromValue = val;
            this.dateFromChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DualPickerComponent.prototype, "dateTo", {
        get: function () {
            return this.dateToValue;
        },
        set: function (val) {
            this.dateToString = val.format("MM/DD/YYYY");
            this.dateToValue = val;
            this.dateToChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    DualPickerComponent.prototype.changeGlobalMode = function (mode) {
        this.mode = mode;
        switch (this.mode) {
            case DualPickerMode.To:
            case DualPickerMode.From:
                this.changeMode(calendarMode_1.CalendarMode.Calendar, this.cal1);
                this.changeMode(calendarMode_1.CalendarMode.Calendar, this.cal2);
                break;
        }
    };
    DualPickerComponent.prototype.onDateFromStringChange = function (val) {
        this.dateFromString = val;
        var m = moment(new Date(val));
        if (m.isValid()) {
            this.dateFromValue.set(m.toObject());
            this.correctDateTo();
            this.cal1.date = this.dateFromValue;
            this.shiftCal2();
            this.dateFromChange.emit(this.dateFromValue);
            this.renderCalendar();
        }
    };
    DualPickerComponent.prototype.onDateToStringChange = function (val) {
        this.dateToString = val;
        var m = moment(new Date(val));
        if (m.isValid()) {
            this.dateToValue.set(m.toObject());
            this.correctDateFrom();
            this.cal2.date = this.dateToValue;
            this.shiftCal1();
            this.dateToChange.emit(this.dateToValue);
            this.renderCalendar();
        }
    };
    DualPickerComponent.prototype.shiftCal1 = function () {
        this.cal1.date = moment(this.cal2.date);
        this.cal1.date.subtract({ "month": 1 });
    };
    DualPickerComponent.prototype.shiftCal2 = function () {
        this.cal2.date = moment(this.cal1.date);
        this.cal2.date.add({ "month": 1 });
    };
    DualPickerComponent.prototype.blur = function (event) {
        if ((event.which || event.keyCode) == 9) {
            this.changeGlobalMode(DualPickerMode.Hidden);
        }
    };
    DualPickerComponent.prototype.changeMode = function (mode, cal) {
        cal.changeMode(mode);
        switch (mode) {
            case calendarMode_1.CalendarMode.Calendar:
                this.renderCalendar();
                break;
        }
    };
    DualPickerComponent.prototype.goPrev = function () {
        if (this.cal1.mode == calendarMode_1.CalendarMode.Calendar && this.cal2.mode == calendarMode_1.CalendarMode.Calendar) {
            this.cal1.date.month(this.cal1.date.month() - 1);
            this.shiftCal2();
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
            this.shiftCal2();
            this.renderCalendar();
        }
        else {
            this.cal1.goNext();
            this.cal2.goNext();
        }
    };
    DualPickerComponent.prototype.ngOnInit = function () {
        this.cal1.date = moment(this.dateFrom);
        this.shiftCal2();
        this.cal1.subscribeToChangeMonth(this.month1ChangeListener);
        this.cal2.subscribeToChangeMonth(this.month2ChangeListener);
        this.cal1.subscribeToChangeYear(this.year1ChangeListener);
        this.cal2.subscribeToChangeYear(this.year2ChangeListener);
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
    };
    DualPickerComponent.prototype.correctDateTo = function () {
        if (this.dateTo && this.dateFrom.isAfter(this.dateTo)) {
            this.dateTo = moment(this.dateFrom);
            this.dateTo.add({ "day": 1 });
            this.dateToString = this.dateTo.format("MM/DD/YYYY");
        }
    };
    DualPickerComponent.prototype.correctDateFrom = function () {
        if (this.dateFrom && this.dateTo.isBefore(this.dateFrom)) {
            this.dateFrom = moment(this.dateTo);
            this.dateFrom.subtract({ "day": 1 });
            this.dateFromString = this.dateFrom.format("MM/DD/YYYY");
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DualPickerComponent.prototype, "dateFromChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DualPickerComponent.prototype, "dateToChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DualPickerComponent.prototype, "dateFrom", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DualPickerComponent.prototype, "dateTo", null);
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
            styleUrls: ['dualpicker.component.css', '../common/common.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DualPickerComponent);
    return DualPickerComponent;
}());
exports.DualPickerComponent = DualPickerComponent;
//# sourceMappingURL=dualpicker.component.js.map