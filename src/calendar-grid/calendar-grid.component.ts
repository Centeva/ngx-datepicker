import { Component, OnInit, OnDestroy, ElementRef, Renderer, ViewEncapsulation, Input } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import * as $ from 'jquery';

@Component({
    selector: 'ct-calendar-grid',
    template: '',
    styleUrls: ['calendar-grid.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarGridComponent implements OnInit, OnDestroy {
    constructor(private myElement: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

    renderCalendar(cal: CalendarComponent, clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment) {
        let d = moment(cal.date);
        d.date(1); //reset date.

        let header = $("<div class='ct-dp-cal-header'></div>");
        for (var i = 0; i < 7; i++) {
            d.day(i);

            let el = $("<div></div>");
            el.text(d.format("dd"));
            el.attr("ct-cal-dp-day", i.toString());
            el.addClass("ct-dp-cal-day"); 

            header.append(el);
        }

        d.date(1); //reset date.
        
        let body = $("<div class='ct-dp-cal-body'></div>");
        for (var i = 0; i < d.day(); i++) {
            let el = $("<div></div>");

            el.attr("ct-dp-cal-day", i.toString());
            el.addClass("ct-dp-cal-day");

            body.append(el);
        }

        while (d.month() === cal.date.month()) {
            let el = $("<button></button>");
            el.text((d.date()).toString())
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
    }

    renderCalendar2(cal: CalendarComponent, clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment) {
        let d = moment(cal.date);
        d.date(1); //reset date.

        this.renderer.selectRootElement(this.myElement.nativeElement);

        const headerElement = this.renderer.createElement(this.myElement.nativeElement, "div");
        this.renderer.setElementClass(headerElement, ".ct-dp-cal-header", true);
        const calElement = this.renderer.createElement(this.myElement.nativeElement, "div");
        this.renderer.setElementClass(headerElement, ".ct-dp-cal-body", true);

        //Add name for day of week
        for (var i = 0; i < 7; i++) {
            d.day(i);
            let el: ElementRef = this.renderer.createElement(headerElement, "div");
            this.renderer.setText(el, d.format("dd"));
            this.renderer.setElementAttribute(el, "ct-cal-dp-day", i.toString());
            this.renderer.setElementClass(el, "ct-dp-cal-day", true);
        }

        d.date(1); //reset date.

        //Add blank filler days.
        for (var i = 0; i < d.day(); i++) {
            let el: ElementRef = this.renderer.createElement(calElement, "div");
            this.renderer.setElementAttribute(el, "ct-dp-cal-day", i.toString());
            this.renderer.setElementClass(el, "ct-dp-cal-day", true);
        }

        //Add calendar
        while (d.month() === cal.date.month()) {
            let component = this;
            let el: ElementRef = this.renderer.createElement(calElement, "button");
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
    }
}
