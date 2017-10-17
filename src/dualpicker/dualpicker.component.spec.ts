/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DualPickerComponent } from "./dualpicker.component";
import { DebugElement } from "@angular/core";
import { CalendarGridComponent } from "../calendar-grid/calendar-grid.component";
import { CalendarComponent } from "../calendar/calendar.component";
import { FormsModule } from "@angular/forms";
import { DatePickerConfig } from "../datepicker.config";
import { DatePickerPopupService } from "../DatePickerPopupService";

/* end of imports */

class MyDatePickerConfig extends DatePickerConfig {}

describe("DualPickerComponent.component", () => {
  let component: DualPickerComponent;
  let fixture: ComponentFixture<DualPickerComponent>;

  let debugElement: DebugElement;
  let nativeElement: Element;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
        CalendarGridComponent,
        DualPickerComponent
      ],
      imports: [FormsModule],
      providers: [{ provide: DatePickerPopupService, useValue: {} }]
    });
    fixture = TestBed.createComponent(DualPickerComponent);

    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = debugElement.nativeElement;
  });

  it("should initialize correctly", () => {
    expect(component).toBeTruthy();
  });
});
