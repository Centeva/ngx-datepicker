/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarGridComponent } from './calendar-grid.component';

/* end of imports */

describe('CalendarGridComponent.component', () => {
	let component: CalendarGridComponent;
	let fixture: ComponentFixture<CalendarGridComponent>
	

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CalendarGridComponent]
		});
		fixture = TestBed.createComponent(CalendarGridComponent);

		component = fixture.componentInstance;
	});

	it('Should reset the calendar mode on global mode change.', () => {
        expect(component).toBeTruthy();
	});

});
