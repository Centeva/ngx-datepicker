import {
	Component, forwardRef, OnChanges, AfterViewInit, OnDestroy, ContentChild, ElementRef,  OnInit, Renderer,
	ViewEncapsulation, Input, ViewChild, QueryList, Output, EventEmitter, Inject
} from "@angular/core";
import * as moment from "moment";
import { CalendarComponent } from "../calendar/calendar.component";
import { CalendarMode } from "../common/calendar-mode";
import * as $ from "jquery";
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from "@angular/forms";
import { DatePickerBase } from "../common/datepicker-base";
import { DatePickerPopupService } from "../DatePickerPopupService";
import { DOCUMENT } from '@angular/platform-browser';

export enum DatePickerMode { Visible, Hidden }

@Component({
	selector: "ct-date-picker",
	templateUrl: "datepicker.component.html",
	styleUrls: ["../common/common.less"],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => DatePickerComponent), multi: true }
	]
})
export class DatePickerComponent extends DatePickerBase implements AfterViewInit, OnDestroy, OnChanges {
	/** Enum Accessors for HTML */
	public CalendarMode = CalendarMode;
	public DatePickerMode = DatePickerMode;

	private _globalMode: CalendarMode = CalendarMode.Calendar;
	/** Set the starting mode for selecting a date. (eg. Calendar, Month, Year) **/
	@Input()
	set globalMode(val: string) {
		if (CalendarMode.hasOwnProperty(val)) {
			switch (CalendarMode[`${val}`]) {
				case CalendarMode.Calendar:
				case CalendarMode.Year:
					this._globalMode = CalendarMode[`${val}`];
			}
		}
	}
	
	private dateValue: moment.Moment;
	
	@Input()
	get date() { return this.dateValue; }
	set date(val) {
		if (this.isSameDay(val, this.dateValue)) { return; }
		if (val instanceof moment && val.isValid()){
			this.input.nativeElement.value = val.format("MM/DD/YYYY");
			val = moment(val.format("YYYY-MM-DD"));
			this.dateValue = val;
			this.dateChange.emit(val);
		}
		else{
			this.dateValue = undefined;
			this.input.nativeElement.value = "";
		}
		this.propagateChange(val);
	}
  	@Output() dateChange = new EventEmitter();

  	@ContentChild("date") input: ElementRef;

	get cal() { return this.datePickerPopupService.getDatePickerPopupComponent().cal; }
	public mode: DatePickerMode = DatePickerMode.Hidden;
  
  	popupSubscriptions: (()=>void)[] = []

  	private domDocument: Document;

	constructor(private myElement: ElementRef, private renderer: Renderer, private datePickerPopupService: DatePickerPopupService, @Inject(DOCUMENT) document) {
		super();
		this.domDocument = document;
	}

	public onDateStringChange(val) {
		let m = moment(new Date(val));
		if (m.isValid()) {
			if (this.dateValue === undefined || this.dateValue === null) {
				this.dateValue = m;
			} else {
				this.dateValue.set(m.toObject());
			}
		}
		else{
			this.dateValue = undefined;
		}
		this.touched();
		this.propagateChange(this.dateValue);
		this.dateChange.emit(this.dateValue);
		this.cal.date = (this.dateValue ? this.dateValue : moment());
		this.renderCalendar();
	}

	public changeGlobalMode(mode: DatePickerMode) {
		this.mode = mode;
		switch (this.mode) {
			case DatePickerMode.Visible:
				this.datePickerPopupService.getDatePickerPopupComponent().setActiveDatePickerComponent(this);
				this.cal.initCalendar(this.date, this.minDate, this.maxDate);

				this.registerListenersForPopup();

				this.changeMode(this._globalMode);
				$(this.myElement.nativeElement).addClass("ct-dp-active");
				this.positionCalendar();
				break;
			case DatePickerMode.Hidden:
				this.hideCalendar();
				$(this.myElement.nativeElement).removeClass("ct-dp-active");
				this.deregisterListenersPopup();
		}
	}

	private registerListenersForPopup() {
		this.deregisterListenersPopup();

		function isChildOf(target: Node, parent: Node) {
			if (target.parentNode == null) return false;
			if (parent == target) return true;
			return isChildOf(target.parentNode, parent);
		}

		this.popupSubscriptions.push(this.cal.subscribeToChangeMonth(this.monthChangeListener));
		this.popupSubscriptions.push(this.cal.subscribeToChangeYear(this.yearChangeListener));

		const closePopupListener = (event: KeyboardEvent) => {
			const clickInInput = (event.target as Node) == this.input.nativeElement;
			const clickInPopup = isChildOf(event.target as Node, this.datePickerPopupService.getDatePickerPopupComponent().getMyElement().nativeElement);
			if (!clickInInput && !clickInPopup) {
				event.preventDefault();
				event.stopPropagation();
				this.changeGlobalMode(DatePickerMode.Hidden);
			}
		};
		this.domDocument.body.addEventListener("mousedown", closePopupListener, true);
		this.popupSubscriptions.push(() => {
			this.domDocument.body.removeEventListener("mousedown", closePopupListener, true);
		})
		this.domDocument.body.addEventListener("wheel", closePopupListener, true);
		this.popupSubscriptions.push(() => {
			this.domDocument.body.removeEventListener("wheel", closePopupListener, true);
		})
	}

	private deregisterListenersPopup() {
		this.popupSubscriptions.forEach(x => x());
		this.popupSubscriptions = []
	}

	private positionCalendar() {
		const picker = this.getPicker();
		picker.removeClass("invisible");
		let top = $(this.input.nativeElement).offset().top + $(this.input.nativeElement).outerHeight();
		let scrollTop = $(window).scrollTop();
		if ($(window).height() < top - scrollTop + picker.height()) {
			picker.removeClass("display-below");
			picker.addClass("display-above");
			this.positionCalendarAbove(picker);
			$(window).on("scroll.datepicker", () => this.positionCalendarAbove(picker));
		} else {
			picker.removeClass("display-above");
			picker.addClass("display-below");
			this.positionCalendarBelow(picker);
			$(window).on("scroll.datepicker", () => this.positionCalendarBelow(picker));
		}
	}

	private getPicker() {
		return $(this.datePickerPopupService.getDatePickerPopupComponent().getMyElement().nativeElement).find(".ct-dp-picker-wrapper");
	}

	private positionCalendarAbove(picker: JQuery) {
		let offset = $(this.input.nativeElement).offset();
		picker.css("top", offset.top - $(window).scrollTop() - picker.height() + this.PICKER_OFFSET);
		picker.css("left", offset.left - $(window).scrollLeft());
	}

	private positionCalendarBelow(picker: JQuery) {
		let offset = $(this.input.nativeElement).offset();
		picker.css("top", offset.top - $(window).scrollTop() + $(this.input.nativeElement).outerHeight() - this.PICKER_OFFSET);
		picker.css("left", offset.left - $(window).scrollLeft());
	}

	private hideCalendar() {
		const picker = this.getPicker();
		picker.removeClass("display-above");
		picker.addClass("display-below");
		picker.addClass("invisible");
		$(window).off(".datepicker");
	}

	private touched() {
		this.propagateTouched(this.date);
	}

	public changeMode(mode: CalendarMode) {
		this.cal.changeMode(mode);
		switch (mode) {
			case CalendarMode.Calendar:
			this.renderCalendar();
			break;
		}
	}

	public goPrev() {
		if (this.cal.mode == CalendarMode.Calendar) {
			this.cal.date.month(this.cal.date.month() - 1);
			this.renderCalendar();
		} else {
			this.cal.goPrev();
		}
	}

	public goNext() {
		if (this.cal.mode == CalendarMode.Calendar) {
			this.cal.date.month(this.cal.date.month() + 1);
			this.renderCalendar();
		} else {
			this.cal.goNext();
		}
	}

	private closePicker(event) {
		if (event.which === 9) {
			this.changeGlobalMode(DatePickerMode.Hidden);
		}
	}

  	ngOnChanges(inputs) {}

	ngAfterViewInit() {
		this.renderCalendar();
		this.input.nativeElement.addEventListener("focus", () => {
			this.changeGlobalMode(DatePickerMode.Visible);
		});
		this.input.nativeElement.addEventListener("keyup", event => {
			this.onDateStringChange(this.input.nativeElement.value);
		});
		this.input.nativeElement.addEventListener("keydown", event => {
			this.closePicker(event);
		});
		this.input.nativeElement.addEventListener("click", event => {
			if(this.mode !== DatePickerMode.Visible){
				this.changeGlobalMode(DatePickerMode.Visible);
			}
		});
	}

	dateClickListener = (date: moment.Moment) => {
		let d = moment(date);
		return () => { 
			this.dateChange.emit(this.dateValue);
			this.setDate(d);
		};
	};

	private monthChangeListener = () => {
		this.changeMode(CalendarMode.Calendar);
	};

	private yearChangeListener = () => {
		this.changeMode(CalendarMode.Calendar);
	};

	setDate(date: moment.Moment) {
		switch (this.mode) {
			case DatePickerMode.Visible:
				//this.touched();
				this.date = date;
				this.changeGlobalMode(DatePickerMode.Hidden);
				break;
		}
		this.renderCalendar();
	}

	ngOnDestroy() {}

	renderCalendar() {
		this.cal.renderCalendar(this.dateClickListener, this.date, this.date);
	}

	writeValue(value) {
		if (value) {
			this.date = value;
		}
	}

	validate(c: FormControl) {
		if (c.value && !c.value.isValid()) {
			return "Invalid Date";
		}
		// if (!(c.value instanceof moment) || !c.value.isValid()) {
		// 	return "Invalid Date";
		// }
		if (this.minDateVal && this.minDateVal.isAfter(c.value)) {
			return "Date cannot be before " + this.minDateVal.format("mm/DD/yyyy");
		}
		if (this.maxDateVal && this.maxDateVal.isBefore(c.value)) {
			return "Date cannot be after " + this.maxDateVal.format("mm/DD/yyyy");
		}
		return null;
	}

	updateMinDate(minDate: moment.Moment) {
		this.cal.minDate = minDate;
		this.cal.initCalendar(this.date);
	}
	updateMaxDate(maxDate: moment.Moment) {
		this.cal.maxDate = maxDate;
		this.cal.initCalendar(this.date);
	}
}