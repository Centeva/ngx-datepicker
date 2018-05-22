/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';
import * as $ from 'jquery';
import { DatePickerConfig } from "../datepicker.config";
import { DatePickerComponent } from '../datepicker/datepicker.component';
import { DatePickerBase } from './datepicker-base';

/* end of imports */

class TestDatePickerBase extends DatePickerBase {
    updateMinDate(minDate: moment.Moment) {
    }
    updateMaxDate(maxDate: moment.Moment) {
    }
    writeValue(value) {
    }
}

describe('DatepickerBase.component', () => {
	let component: TestDatePickerBase;
	// let fixture: ComponentFixture<DatePickerComponent>
	// let debugElement: DebugElement;
	// let nativeElement: Element;

	beforeEach(() => {
        component = new TestDatePickerBase();
		// TestBed.configureTestingModule({
		// 	declarations: [CalendarComponent, CalendarGridComponent, DatePickerComponent],
        //     imports: [FormsModule],
		// 	providers:[{ provide: DatePickerConfig, useValue: new MyDatePickerConfig()}]
		// });
		// fixture = TestBed.createComponent(DatePickerComponent);

		// component = fixture.componentInstance;
		// debugElement = fixture.debugElement;
		// nativeElement = debugElement.nativeElement;
	});
	it('TwoDigitYear-Dont handle null date', () => {
        let m = null;
        let results = component.twoDigitYearShim(m,null);
		expect(results).toBe(null);
	});
	it('TwoDigitYear-Dont handle null raw value', () => {
        let m = moment();
        let results = component.twoDigitYearShim(m,null);
		expect(results).toBe(m);
	});
	it('TwoDigitYear-Dont handle two digit year in 1900', () => {
        let m = moment('1/5/1918');
        let results = component.twoDigitYearShim(m,'1/5/18');
		expect(results.format('MM/DD/YYYY')).toBe('01/05/2018');
	});
	it('TwoDigitYear-Dont handle two digit year in 2000', () => {
        let m = moment('1/5/2018');
        let results = component.twoDigitYearShim(m,'1/5/18');
		expect(results.format('MM/DD/YYYY')).toBe('01/05/2018');
	});
	it('TwoDigitYear-Dont handle four digit year in 1900', () => {
        let m = moment('1/5/1918');
        let results = component.twoDigitYearShim(m,'1/5/1918');
		expect(results.format('MM/DD/YYYY')).toBe('01/05/1918');
	});
	it('TwoDigitYear-Dont handle four digit year in 2000', () => {
        let m = moment('1/5/2018');
        let results = component.twoDigitYearShim(m,'1/5/2018');
		expect(results.format('MM/DD/YYYY')).toBe('01/05/2018');
	});
	it('should initialize correctly', () => {
		expect(component).toBeTruthy();
	});

});
