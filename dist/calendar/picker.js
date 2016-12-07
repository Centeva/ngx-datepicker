"use strict";
var pickerMode_1 = require('./pickerMode');
var moment = require('moment');
var Picker = (function () {
    function Picker() {
        this.numYearsShown = 9;
        this.halfNumYearsShown = Math.floor(this.numYearsShown / 2);
        this.months = [];
        this.years = [];
        this.mode = pickerMode_1.PickerMode.Calendar;
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
            case pickerMode_1.PickerMode.Calendar:
                break;
            case pickerMode_1.PickerMode.Month:
                break;
            case pickerMode_1.PickerMode.Year:
                this.generateYearData(this.years[this.halfNumYearsShown] - this.numYearsShown);
        }
    };
    Picker.prototype.goNext = function () {
        switch (this.mode) {
            case pickerMode_1.PickerMode.Calendar:
                break;
            case pickerMode_1.PickerMode.Month:
                break;
            case pickerMode_1.PickerMode.Year:
                this.generateYearData(this.years[this.halfNumYearsShown] + this.numYearsShown);
        }
    };
    return Picker;
}());
exports.Picker = Picker;
//# sourceMappingURL=picker.js.map