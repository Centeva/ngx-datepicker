"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var calendar_component_1 = require('./calendar.component');
var dualpicker_component_1 = require('./dualpicker.component');
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
var DatePickerComponent = (function (_super) {
    __extends(DatePickerComponent, _super);
    function DatePickerComponent(myElement, renderer) {
        var _this = this;
        _super.call(this);
        this.myElement = myElement;
        this.renderer = renderer;
        this.numYearsShown = 9;
        this.halfNumYearsShown = Math.floor(this.numYearsShown / 2);
        this.Mode = Mode;
        this.Type = Type;
        this.dateClickListener = function (date) {
            return function () {
                _this.setDate(date);
            };
        };
        this.date = moment(new Date());
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
        this.cal1.renderCalendar(this, this.dateClickListener);
    };
    DatePickerComponent.prototype.setDate = function (date) {
        this.date.date(date);
        this.renderCalendar();
        this.dateString = this.date.format("MM/DD/YYYY");
    };
    __decorate([
        core_1.ViewChild('cal1', calendar_component_1.CalendarComponent), 
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
}(dualpicker_component_1.Picker));
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=datepicker.component.js.map