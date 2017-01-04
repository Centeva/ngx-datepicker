import { Directive, Component, AfterViewInit, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, OnDestroy, ElementRef, OnInit, Renderer, ViewEncapsulation, Input, ViewChild, QueryList, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarMode } from '../common/calendar-mode';

export enum DatePickerMode {
  Visible, Hidden
}

@Component({
  selector: 'ct-datepicker-inner',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.less', '../common/common.less'],
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerInnerComponent {
  public CalendarMode = CalendarMode;
  public DatePickerMode = DatePickerMode;

  public parent: DatePickerComponent;
  @Input("ctDisabled") disabled: boolean = false;
  @Input() inputClass: any;

  @ViewChild(CalendarComponent) public cal: CalendarComponent;
  public mode: DatePickerMode = DatePickerMode.Hidden;

  constructor(private myElement: ElementRef, private renderer: Renderer) {
  }

  public changeGlobalMode(mode: DatePickerMode) {
    this.mode = mode;
    switch (this.mode) {
      case DatePickerMode.Visible:
        this.changeMode(CalendarMode.Calendar);
        break;
    }
  }

  public blur(event) {
    if ((event.which || event.keyCode) == 9) {
      this.changeGlobalMode(DatePickerMode.Hidden);
    }
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

  ngOnInit() {
    if (this.parent.date instanceof moment && this.parent.date.isValid()) {
      this.cal.date = moment(this.parent.date);
    } else {
      this.cal.date = moment();
    }
    this.cal.subscribeToChangeMonth(this.monthChangeListener);
    this.cal.subscribeToChangeYear(this.yearChangeListener);
  }

  ngAfterViewInit() {
    this.renderCalendar();
  }

  ngOnDestroy() {

  }

  renderCalendar() {
    this.cal.renderCalendar(this.dateClickListener, this.parent.date, this.parent.date);
  }

  dateClickListener = (date: moment.Moment) => {
    let d = moment(date);
    return () => {
      this.setDate(d);
    }
  }

  private monthChangeListener = () => {
    this.changeMode(CalendarMode.Calendar);
  }

  private yearChangeListener = () => {
    this.changeMode(CalendarMode.Calendar);
  }

  setDate(date: moment.Moment) {
    switch (this.mode) {
      case DatePickerMode.Visible:
        this.parent.dateChange.emit(date);
        this.parent.dateValue = date;
        this.changeGlobalMode(DatePickerMode.Hidden);
        break;
    }
    this.renderCalendar();
  }

  
  public onDateStringChange(val) {
     let m = moment(new Date(val));
     this.parent.dateValue.set(m.toObject());
     this.parent.dateChange.emit(this.parent.dateValue);
     if (m.isValid()) {
       this.cal.date = this.parent.dateValue;
     } else {
       this.cal.date = moment();
     }
     this.renderCalendar();
  }
}

@Component({
  selector: 'input[ctDatepicker]',
  template: '',
  entryComponents: [DatePickerInnerComponent]
})
export class DatePickerComponent implements OnInit {
  @Output() dateChange = new EventEmitter();
  dateValue: moment.Moment;
  @Input()
  get date() {
    return this.dateValue;
  }
  set date(val) {
    if (val instanceof moment && val.isValid()) {
      this.element.nativeElement.value = val.format("MM/DD/YYYY");
      this.dateValue = val;
      this.dateChange.emit(val);
    }
  }
  private datePickerInnerComponent: DatePickerInnerComponent;

  constructor(private element: ElementRef,
    private viewContainer: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
    element.nativeElement.addEventListener('focus', (event) => { this.datePickerInnerComponent.changeGlobalMode(DatePickerMode.Visible); });
    element.nativeElement.addEventListener('keydown', (event) => { this.datePickerInnerComponent.blur(event) });
    element.nativeElement.addEventListener('keyup', (event) => { this.datePickerInnerComponent.onDateStringChange(element.nativeElement.value)});
  }

  ngOnInit() {
    let pickerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DatePickerInnerComponent);
    let ref = this.viewContainer.createComponent(pickerComponentFactory);
    this.datePickerInnerComponent = ref.instance;
    this.datePickerInnerComponent.parent = this;
  }

}
