import { Component, ElementRef, ViewEncapsulation, ViewChild } from "@angular/core";
import { CalendarComponent } from "../calendar/calendar.component";
import { CalendarMode } from "../common/calendar-mode";
import { DatePickerMode } from "../datepicker/datepicker.component"

export interface DatePickerPopupConfig {
  inputEl: Element;
}

function isChildOf(target: Node, parent: Node): boolean {
  if (!target.parentNode) return false;
  return target == parent || isChildOf(target.parentNode, parent);
}

@Component({
  selector: "datepicker-popup",
  templateUrl: "datepicker-popup.component.html",
  styleUrls: ["datepicker-popup.component.less", "../common/common.less"],
  encapsulation: ViewEncapsulation.None
  // providers: [
  //   { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatepickerPopupComponent), multi: true },
  //   { provide: NG_VALIDATORS, useExisting: forwardRef(() => DatepickerPopupComponent), multi: true }
  // ]
})
export class DatePickerPopupComponent {
	@ViewChild('cal') public cal: CalendarComponent;

	constructor(private myElement: ElementRef) {}

	private activeDatePicker: any;

	public getMyElement(){
		return this.myElement
	}

	public setActiveDatePickerComponent(datepickerComponent){
		this.activeDatePicker = datepickerComponent
	}

	/** Enum Accessors for HTML */
	public CalendarMode = CalendarMode;
	public DatePickerMode = DatePickerMode;
}