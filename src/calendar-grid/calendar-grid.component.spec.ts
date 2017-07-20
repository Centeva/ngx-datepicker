/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { DebugElement  }    from '@angular/core';
import { By }              from '@angular/platform-browser';
import { CalendarGridComponent } from './calendar-grid.component';
import * as moment from 'moment';
import * as $ from 'jquery';

/* end of imports */

describe('CalendarGridComponent.component', () => {
	let component: CalendarGridComponent;
	let fixture: ComponentFixture<CalendarGridComponent>
	let debugElement: DebugElement;
	let nativeElement: Element;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CalendarGridComponent]
		});
		fixture = TestBed.createComponent(CalendarGridComponent);

		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		nativeElement = debugElement.nativeElement;
	});

	it('should initialize correctly', () => {
        expect(component).toBeTruthy();
	});

	it('should show the correct selected dates and between values', () =>{
		let date = moment("2017-01-01");
		let dateFrom = moment("2017-01-05");
		let dateTo = moment("2017-01-10");

//		component.renderCalendar(date, () => {}, dateTo, dateFrom, null, null);

		//From
		let elFrom = $(nativeElement).find("[ct-dp-cal-day=5]");
		expect(elFrom).toBeTruthy();
		expect(elFrom.hasClass("active")).toBeTruthy();

		//To
		let elTo = $(nativeElement).find("[ct-dp-cal-day=10]");
		expect(elTo).toBeTruthy();
		expect(elTo.hasClass("active")).toBeTruthy();

		//between
		let elBetween = $(nativeElement).find("[ct-dp-cal-day=9]");
		expect(elBetween).toBeTruthy();
		expect(elBetween.hasClass("between")).toBeTruthy();

		//!between
		let elNotBetween = $(nativeElement).find("[ct-dp-cal-day=11]");
		expect(elNotBetween).toBeTruthy();
		expect(elNotBetween.hasClass("between")).toBeFalsy();
	});

});
