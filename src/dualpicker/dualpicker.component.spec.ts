/* tslint:disable:no-unused-variable */

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
	async,
	inject
} from '@angular/core/testing';

import { DualPickerComponent } from './dualpicker.component';

/* end of imports */

describe('DualPickerComponent.component', () => {
	let component: DualPickerComponent;

	beforeEach(() => {
		component = new DualPickerComponent();
	});

	it('DualPickerComponent', () => {
        expect(component).toBeTruthy();
	});

});
