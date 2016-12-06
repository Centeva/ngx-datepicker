import { Component, OnInit, OnDestroy, ElementRef, Renderer, ViewEncapsulation, Input } from '@angular/core';
import * as moment from 'moment';
import {Picker} from './dualpicker.component';

@Component({
    moduleId: module.id,
    selector: 'ct-calendar',
    template: '',
    styleUrls: ['calendar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnDestroy {
    constructor(private myElement: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

    renderCalendar(picker: Picker, clickCallback: Function) {
        let d = moment(picker.date);
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
        while (d.month() === picker.date.month()) {
            let component = this;
            let el: ElementRef = this.renderer.createElement(calElement, "button");
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
    }
}
