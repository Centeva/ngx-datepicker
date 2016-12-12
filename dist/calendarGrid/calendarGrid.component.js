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
var $ = require('jquery');
var CalendarGridComponent = (function () {
    function CalendarGridComponent(myElement, renderer) {
        this.myElement = myElement;
        this.renderer = renderer;
    }
    CalendarGridComponent.prototype.ngOnInit = function () {
    };
    CalendarGridComponent.prototype.ngOnDestroy = function () {
    };
    CalendarGridComponent.prototype.renderCalendar = function (cal, clickCallback, dateTo, dateFrom) {
        var d = moment(cal.date);
        d.date(1);
        var header = $("<div class='ct-dp-cal-header'></div>");
        for (var i = 0; i < 7; i++) {
            d.day(i);
            var el = $("<div></div>");
            el.text(d.format("dd"));
            el.attr("ct-cal-dp-day", i.toString());
            el.addClass("ct-dp-cal-day");
            header.append(el);
        }
        d.date(1);
        var body = $("<div class='ct-dp-cal-body'></div>");
        for (var i = 0; i < d.day(); i++) {
            var el = $("<div></div>");
            el.attr("ct-dp-cal-day", i.toString());
            el.addClass("ct-dp-cal-day");
            body.append(el);
        }
        while (d.month() === cal.date.month()) {
            var el = $("<button></button>");
            el.text((d.date()).toString());
            el.attr("ct-dp-cal-day", d.date().toString());
            el.attr("tabIndex", "-1");
            el.addClass("ct-dp-cal-day");
            if ((dateTo && d.isSame(dateTo, "day")) || (dateFrom && d.isSame(dateFrom, "day"))) {
                el.addClass("active");
            }
            if (dateFrom && dateTo && d.isBetween(dateFrom, dateTo)) {
                el.addClass("between");
            }
            el.click(clickCallback(d));
            d.date(d.date() + 1);
            body.append(el);
        }
        $(this.myElement.nativeElement).empty();
        header.appendTo(this.myElement.nativeElement);
        body.appendTo(this.myElement.nativeElement);
    };
    CalendarGridComponent.prototype.renderCalendar2 = function (cal, clickCallback, dateTo, dateFrom) {
        var d = moment(cal.date);
        d.date(1);
        this.renderer.selectRootElement(this.myElement.nativeElement);
        var headerElement = this.renderer.createElement(this.myElement.nativeElement, "div");
        this.renderer.setElementClass(headerElement, ".ct-dp-cal-header", true);
        var calElement = this.renderer.createElement(this.myElement.nativeElement, "div");
        this.renderer.setElementClass(headerElement, ".ct-dp-cal-body", true);
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
        while (d.month() === cal.date.month()) {
            var component = this;
            var el = this.renderer.createElement(calElement, "button");
            this.renderer.setText(el, (d.date()).toString());
            this.renderer.setElementAttribute(el, "ct-dp-cal-day", d.date().toString());
            this.renderer.setElementAttribute(el, "tabindex", "-1");
            this.renderer.setElementClass(el, "ct-dp-cal-day", true);
            if ((dateTo && d.isSame(dateTo, "day")) || (dateFrom && d.isSame(dateFrom, "day"))) {
                this.renderer.setElementClass(el, "active", true);
            }
            if (dateFrom && dateTo && d.isBetween(dateFrom, dateTo)) {
                this.renderer.setElementClass(el, "between", true);
            }
            this.renderer.listen(el, "click", clickCallback(d));
            d.date(d.date() + 1);
        }
    };
    CalendarGridComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ct-calendar-grid',
            template: '',
            styleUrls: ['calendarGrid.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], CalendarGridComponent);
    return CalendarGridComponent;
}());
exports.CalendarGridComponent = CalendarGridComponent;
//# sourceMappingURL=calendarGrid.component.js.map