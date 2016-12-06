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
var CalendarComponent = (function () {
    function CalendarComponent(myElement, renderer) {
        this.myElement = myElement;
        this.renderer = renderer;
    }
    CalendarComponent.prototype.ngOnInit = function () {
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
    };
    CalendarComponent.prototype.renderCalendar = function (picker, clickCallback) {
        var d = moment(picker.date);
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
        while (d.month() === picker.date.month()) {
            var component = this;
            var el = this.renderer.createElement(calElement, "button");
            this.renderer.setText(el, (d.date()).toString());
            this.renderer.setElementAttribute(el, "ct-dp-cal-day", d.date().toString());
            this.renderer.setElementAttribute(el, "tabindex", "-1");
            this.renderer.setElementClass(el, "ct-dp-cal-day", true);
            if (d.isSame(picker.date, "day")) {
                this.renderer.setElementClass(el, "active", true);
            }
            this.renderer.listen(el, "click", clickCallback(d.date(), picker));
            d.date(d.date() + 1);
        }
    };
    CalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ct-calendar',
            template: '',
            styleUrls: ['calendar.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map