

import { Injectable, ComponentFactoryResolver, Renderer, Injector, ApplicationRef } from '@angular/core';
import { DatePickerPopupComponent } from './datepicker-popup/datepicker-popup.component';

@Injectable()
export class DatePickerPopupService {

    private popupComponent: DatePickerPopupComponent

    constructor(resolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef){
        const element = document.createElement('div');
        document.body.appendChild(element);
        const factory = resolver.resolveComponentFactory(DatePickerPopupComponent);
        const compRef = factory.create(injector, [], element);
        appRef.attachView(compRef.hostView);
        this.popupComponent = compRef.instance
    }

    getDatePickerPopupComponent(){
        return this.popupComponent
    }
}
