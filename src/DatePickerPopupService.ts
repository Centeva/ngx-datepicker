import {
  Injectable,
  ComponentFactoryResolver,
  Renderer,
  Injector,
  ApplicationRef
} from "@angular/core";
import { DatePickerPopupComponent } from "./datepicker-popup/datepicker-popup.component";
import { DualPickerPopupComponent } from "./dualpicker-popup/dualpicker-popup.component";

@Injectable()
export class DatePickerPopupService {
  private datePickerPopupComponent: DatePickerPopupComponent;
  private dualPickerPopupComponent: DualPickerPopupComponent;

  constructor(
    resolver: ComponentFactoryResolver,
    injector: Injector,
    appRef: ApplicationRef
  ) {
    this.createDatePickerPopup(resolver, injector, appRef);
    this.createDualPickerPopup(resolver, injector, appRef);
  }

  private createDatePickerPopup(resolver, injector, appRef) {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const factory = resolver.resolveComponentFactory(DatePickerPopupComponent);
    const compRef = factory.create(injector, [], element);
    appRef.attachView(compRef.hostView);
    this.datePickerPopupComponent = compRef.instance;
  }

  private createDualPickerPopup(resolver, injector, appRef) {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const factory = resolver.resolveComponentFactory(DualPickerPopupComponent);
    const compRef = factory.create(injector, [], element);
    appRef.attachView(compRef.hostView);
    this.dualPickerPopupComponent = compRef.instance;
  }

  getDatePickerPopupComponent() {
    return this.datePickerPopupComponent;
  }

  getDualPickerPopupComponent() {
    return this.dualPickerPopupComponent;
  }
}
