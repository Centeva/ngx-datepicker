import { Component, OnInit, OnDestroy,  ElementRef, Renderer, ViewEncapsulation, Input, ViewChild } from "@angular/core";
import * as moment from "moment";
import { CalendarMode } from "../common/calendar-mode";
import { CalendarGridComponent } from "../calendar-grid/calendar-grid.component";

@Component({
  selector: "ct-calendar",
  templateUrl: "calendar.component.html",
  styleUrls: ["calendar.component.less"],
  encapsulation: ViewEncapsulation.None
})/**  NOTE: Calendar is rendered on page load, make sure appropriate variables are always valid. */
export class CalendarComponent implements OnDestroy {
	private static numYearsShown = 15;/** Determines how many year buttons are shown. */
	private static halfNumYearsShown = Math.floor(CalendarComponent.numYearsShown / 2); /** convenience variable for generating years */
	public CalendarMode = CalendarMode;/** Accessor to the mode for html */
	public mode: CalendarMode;
	public date: moment.Moment = moment();/** Date object representing the month/year shown on this calendar */
	public today: moment.Moment;/** Date object representing today.This should never change in the rendering of the calendar grid */
	private months: string[] = [];/** Array of months to show when selecting a new month */
	private years: number[] = [];/** Array of years to show when selecting a new year */
	get yearData(): number[] { return this.years; }
	private monthListeners: Function[] = [];/** Listeners for month change */
	private yearListeners: Function[] = [];/** Listeners for year change */
	@ViewChild(CalendarGridComponent) public grid: CalendarGridComponent;/** Grid view child component (actually shows the number grid) */
	public minDate: moment.Moment;/** The minimum date allowed to select */
	public maxDate: moment.Moment;/** The maximum date allowed to select */

  	constructor() { this.generateMonthData(); }

  	initCalendar(date: moment.Moment, minDate: moment.Moment = this.minDate, maxDate: moment.Moment = this.maxDate) {
		if (date instanceof moment && date.isValid()) {
			this.date = moment(date);
		} else {
			this.date = moment();
		}

		if (minDate instanceof moment && minDate.isValid() && this.date < minDate) {
			this.date = moment(minDate);
		} else if (maxDate instanceof moment && maxDate.isValid() && this.date > maxDate) {
			this.date = moment(maxDate);
		}

		this.minDate = minDate;
		this.maxDate = maxDate;
	}
	 
	ngOnDestroy() {}

	subscribeToChangeMonth(listener: Function) {
		this.monthListeners.push(listener);
		return () => (this.yearListeners = this.yearListeners.filter(x => x !== listener));
	}

	subscribeToChangeYear(listener: Function) {
		this.yearListeners.push(listener);
		return () => (this.yearListeners = this.yearListeners.filter(x => x !== listener));
	}

	changeMode(mode: CalendarMode) {
		this.mode = mode;
		switch (mode) {
			case CalendarMode.Year:
			this.generateYearData(this.date.year());
			break;
		}
	}

	private generateMonthData() {
		let date = moment(new Date()); //doesn't change
		date.month(0);
		let d = moment(new Date());
		d.month(0);
		while (date.year() === d.year()) {
			this.months.push(d.format("MMM"));
			d.month(d.month() + 1);
		}
	}

	private generateYearData(year: number) {
		this.years = [];
		let y = year - CalendarComponent.halfNumYearsShown;
		for (var i = 0; i < CalendarComponent.numYearsShown; i++) {
			this.years.push(y + i);
		}
	}

	goPrev() {
		switch (this.mode) {
			case CalendarMode.Calendar:
				break;
			case CalendarMode.Month:
				break;
			case CalendarMode.Year:
				this.generateYearData(this.years[CalendarComponent.halfNumYearsShown] - CalendarComponent.numYearsShown);
		}
	}

	goNext() {
		switch (this.mode) {
			case CalendarMode.Calendar:
				break;
			case CalendarMode.Month:
				break;
			case CalendarMode.Year:
				this.generateYearData(this.years[CalendarComponent.halfNumYearsShown] + CalendarComponent.numYearsShown);
		}
	}

	renderCalendar = (clickCallback: Function, dateTo: moment.Moment, dateFrom: moment.Moment) => {
		this.grid.renderCalendar(this.date, clickCallback, dateTo, dateFrom, this.minDate, this.maxDate);
	}

	setMonth(index: number) {
		this.date.month(index);
		for (let fn of this.monthListeners) {
			fn();
		}
	}

	setYear(year: number) {
		this.date.year(year);
		for (let fn of this.yearListeners) {
			fn();
		}
	}

	disableBtn(item: any, unit: moment.unitOfTime.StartOf) {
		let validDate: moment.Moment;
		if (unit === "year") {
			validDate = moment({ year: item, month: 0, day: 1 });
		}
		if (unit === "month") {// because of how we loop over the months, we have to get the number representation of the string month
			validDate = moment({
				year: this.date.year(),
				month: moment().month(item).month(),
				day: 1
			});
		}
		return !validDate.isBetween(this.minDate, this.maxDate, unit, "[]");
	}
}