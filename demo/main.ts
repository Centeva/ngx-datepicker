import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './app/';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

