/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CalendarComponent } from './calendar.component';
import { CalendarGridComponent } from '../calendar-grid/calendar-grid.component';
import * as moment from 'moment';
import * as $ from 'jquery';

/* end of imports */

describe('CalendarGridComponent.component', () => {
	let component: CalendarComponent;
	let fixture: ComponentFixture<CalendarComponent>
	let debugElement: DebugElement;
	let nativeElement: Element;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CalendarComponent, CalendarGridComponent]
		});
		fixture = TestBed.createComponent(CalendarComponent);

		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		nativeElement = debugElement.nativeElement;
	});

	it('should initialize correctly', () => {
		expect(component).toBeTruthy();
	});

	it('should generate year data on change of mode to year', () => {
		component.date = moment("2017-01-01");
		expect(component.yearData.length).toBe(0);
		component.changeMode(component.CalendarMode.Year);
		expect(component.yearData.length).toBeGreaterThan(0);
	});

	it('should notify subscribers on change of month', (done) => {
		component.date = moment("2017-01-01");
		component.subscribeToChangeMonth(() => { done(); });
		component.setMonth(2);
	});

	it('should notify subscribers on change of year', (done) => {
		component.date = moment("2017-01-01");
		component.subscribeToChangeYear(() => { done(); });
		component.setYear(2);
	});

	it('should generate year data goPrev', () => {
		component.date = moment("2017-01-01");
		expect(component.yearData.length).toBe(0);
		component.mode = component.CalendarMode.Year;
		component.goPrev();
		expect(component.yearData.length).toBeGreaterThan(0);
	});

	it('should generate year data goNext', () => {
		component.date = moment("2017-01-01");
		expect(component.yearData.length).toBe(0);
		component.mode = component.CalendarMode.Year;
		component.goNext();
		expect(component.yearData.length).toBeGreaterThan(0);
	});
});
