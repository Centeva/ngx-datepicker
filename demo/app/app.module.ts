import { HomeComponent } from './component/home/';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy, PlatformLocation } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRouterProviders } from './app.routes';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
	],
	imports: [
		appRouterProviders,
		BrowserModule,
		FormsModule,
		HttpModule,
	],
	bootstrap: [
		AppComponent
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		HttpModule,
	],
})
export class AppModule {
}
