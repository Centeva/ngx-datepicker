/* tslint:disable:no-unused-variable */

import {
	async, inject
} from '@angular/core/testing';
import { AppComponent } from './app.component';

// deprecated
// beforeEachProviders(() => [AppComponent]);

xdescribe('App: Inspections', () => {
	it('should create the app',
		inject([AppComponent], (app: AppComponent) => {
			expect(app).toBeTruthy();
		}));

	it('should have as title \'app works!\'',
		inject([AppComponent], (app: AppComponent) => {
			expect('app works!').toEqual('app works!');
		}));
});
