/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DatePickerComponent } from './datepicker.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarGridComponent } from '../calendar-grid/calendar-grid.component';
import * as moment from 'moment';
import * as $ from 'jquery';
import { DatePickerConfig } from "../datepicker.config";

/* end of imports */

class MyDatePickerConfig extends DatePickerConfig {

}

describe('CalendarGridComponent.component', () => {
	let component: DatePickerComponent;
	let fixture: ComponentFixture<DatePickerComponent>
	let debugElement: DebugElement;
	let nativeElement: Element;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CalendarComponent, CalendarGridComponent, DatePickerComponent],
            imports: [FormsModule],
			providers:[{ provide: DatePickerConfig, useValue: new MyDatePickerConfig()}]
		});
		fixture = TestBed.createComponent(DatePickerComponent);

		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		nativeElement = debugElement.nativeElement;
	});

	it('should initialize correctly', () => {
		expect(component).toBeTruthy();
	});

});
