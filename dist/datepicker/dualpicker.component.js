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
var calendar_component_1 = require('./calendar.component');
(function (Mode) {
    Mode[Mode["Calendar"] = 0] = "Calendar";
    Mode[Mode["Month"] = 1] = "Month";
    Mode[Mode["Year"] = 2] = "Year";
    Mode[Mode["Hidden"] = 3] = "Hidden";
})(exports.Mode || (exports.Mode = {}));
var Mode = exports.Mode;
(function (GlobalMode) {
    GlobalMode[GlobalMode["To"] = 0] = "To";
    GlobalMode[GlobalMode["From"] = 1] = "From";
    GlobalMode[GlobalMode["Hidden"] = 2] = "Hidden";
})(exports.GlobalMode || (exports.GlobalMode = {}));
var GlobalMode = exports.GlobalMode;
(function (Type) {
    Type[Type["Text"] = 0] = "Text";
    Type[Type["DoubleText"] = 1] = "DoubleText";
})(exports.Type || (exports.Type = {}));
var Type = exports.Type;
var Picker = (function () {
    function Picker() {
        this.numYearsShown = 9;
        this.halfNumYearsShown = Math.floor(this.numYearsShown / 2);
        this.months = [];
        this.years = [];
        this.mode = Mode.Calendar;
        this.generateMonthData();
    }
    Picker.prototype.generateMonthData = function () {
        var date = moment(new Date());
        date.month(0);
        var d = moment(new Date());
        d.month(0);
        while (date.year() === d.year()) {
            this.months.push(d.format("MMM"));
            d.month(d.month() + 1);
        }
    };
    Picker.prototype.generateYearData = function (year) {
        this.years = [];
        var y = year - this.halfNumYearsShown;
        for (var i = 0; i < this.numYearsShown; i++) {
            this.years.push(y + i);
        }
    };
    Picker.prototype.goPrev = function () {
        switch (this.mode) {
            case Mode.Calendar:
                break;
            case Mode.Month:
                break;
            case Mode.Year:
                this.generateYearData(this.years[this.halfNumYearsShown] - this.numYearsShown);
        }
    };
    Picker.prototype.goNext = function () {
        switch (this.mode) {
            case Mode.Calendar:
                break;
            case Mode.Month:
                break;
            case Mode.Year:
                this.generateYearData(this.years[this.halfNumYearsShown] + this.numYearsShown);
        }
    };
    return Picker;
}());
exports.Picker = Picker;
var DualPickerComponent = (function () {
    function DualPickerComponent(myElement, renderer) {
        var _this = this;
        this.myElement = myElement;
        this.renderer = renderer;
        this.Mode = Mode;
        this.Type = Type;
        this.GlobalMode = GlobalMode;
        this.picker1 = new Picker();
        this.picker2 = new Picker();
        this.globalMode = GlobalMode.From;
        this.dateClickListener = function (date) {
            var d = moment(date);
            return function () {
                _this.setDate(d);
            };
        };
        this.picker1.date = moment(new Date());
        this.picker2.date = moment(this.picker2.date);
        this.picker2.date.add({ month: 1 });
    }
    DualPickerComponent.prototype.changeGlobalMode = function (mode) {
        this.globalMode = mode;
        switch (this.globalMode) {
            case GlobalMode.To:
            case GlobalMode.From:
                this.changeMode(Mode.Calendar, this.picker1);
                this.changeMode(Mode.Calendar, this.picker2);
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
            case Mode.Calendar:
                this.renderCalendar();
            case Mode.Year:
                picker.generateYearData(picker.date.year());
                break;
        }
    };
    DualPickerComponent.prototype.goPrev = function () {
        if (this.picker1.mode == Mode.Calendar && this.picker2.mode == Mode.Calendar) {
            this.picker1.date.month(this.picker1.date.month() - 1);
            this.picker2.date = moment(this.picker1.date);
            this.picker2.date.add({ month: 1 });
            this.renderCalendar();
        }
        else {
            this.picker1.goPrev();
            this.picker2.goPrev();
        }
    };
    DualPickerComponent.prototype.goNext = function () {
        if (this.picker1.mode == Mode.Calendar && this.picker2.mode == Mode.Calendar) {
            this.picker1.date.month(this.picker1.date.month() + 1);
            this.picker2.date = moment(this.picker1.date);
            this.picker2.date.add({ month: 1 });
            this.renderCalendar();
        }
        else {
            this.picker1.goNext();
            this.picker2.goNext();
        }
    };
    DualPickerComponent.prototype.setMonth = function (index, is1) {
        if (is1) {
            this.picker1.date.month(index);
            this.picker2.date = moment(this.picker1.date);
            this.picker2.date.add({ month: 1 });
        }
        else {
            this.picker1.date.month(index - 1);
            this.picker1.date = moment(this.picker2.date);
            this.picker1.date.subtract({ month: 1 });
        }
        this.changeMode(Mode.Calendar, this.picker1);
        this.changeMode(Mode.Calendar, this.picker2);
    };
    DualPickerComponent.prototype.setYear = function (year, is1) {
        if (is1) {
            this.picker1.date.year(year);
            this.picker2.date = moment(this.picker1.date);
            this.picker2.date.add({ month: 1 });
        }
        else {
            this.picker2.date.year(year);
            this.picker1.date = moment(this.picker2.date);
            this.picker1.date.subtract({ month: 1 });
        }
        this.changeMode(Mode.Calendar, this.picker1);
        this.changeMode(Mode.Calendar, this.picker2);
    };
    DualPickerComponent.prototype.ngOnInit = function () {
        var iType = this.iType.toLowerCase();
        if (iType === "text") {
            this.type = Type.Text;
        }
        else if (iType === "doubletext") {
            this.type = Type.DoubleText;
        }
    };
    DualPickerComponent.prototype.ngAfterViewInit = function () {
        this.renderCalendar();
    };
    DualPickerComponent.prototype.ngOnDestroy = function () {
    };
    DualPickerComponent.prototype.renderCalendar = function () {
        this.cal1.renderCalendar(this.picker1, this.dateClickListener, this.dateTo, this.dateFrom);
        this.cal2.renderCalendar(this.picker2, this.dateClickListener, this.dateTo, this.dateFrom);
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
    __decorate([
        core_1.Input("type"), 
        __metadata('design:type', String)
    ], DualPickerComponent.prototype, "iType", void 0);
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