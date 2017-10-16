import {
  Component,
  forwardRef,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  ContentChild,
  ElementRef,
  OnInit,
  Renderer,
  ViewEncapsulation,
  Input,
  ViewChild,
  QueryList,
  Output,
  EventEmitter
} from "@angular/core";
import * as moment from "moment";
import { CalendarComponent } from "../calendar/calendar.component";
import { CalendarMode } from "../common/calendar-mode";
import * as $ from "jquery";
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from "@angular/forms";
import { DatePickerBase } from "../common/datepicker-base";
//import { DualPickerMode } from "../dualpicker/dualpicker.component";

export interface DatePickerPopupConfig {
  inputEl: Element;
}

function isChildOf(target: Node, parent: Node): boolean {
  if (!target.parentNode) return false;
  return target == parent || isChildOf(target.parentNode, parent);
}

@Component({
  selector: "ct-dual-picker-popup",
  templateUrl: "dualpicker-popup.component.html",
  styleUrls: ["dualpicker-popup.component.less", "../common/common.less"],
  encapsulation: ViewEncapsulation.None
})
export class DualPickerPopupComponent {
  /** Cal1 view child component, use to control rendering */
  @ViewChild("cal1") public cal1: CalendarComponent;
  /** Cal2 view child component, use to control rendering */
  @ViewChild("cal2") public cal2: CalendarComponent;

  constructor(private myElement: ElementRef) {}

  private activeDatePicker: any;

  public getMyElement() {
    return this.myElement;
  }

  public setActiveDatePickerComponent(datepickerComponent) {
    this.activeDatePicker = datepickerComponent;
  }

  /** Enum Accessors for HTML */
  public CalendarMode = CalendarMode;
  public DualPickerMode = {};
}
