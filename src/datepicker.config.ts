import { Injectable, NgModuleRef, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

export class FieldModuleBase { }

export interface DatePickerConfig {
    fieldModules: (ModuleWithProviders | typeof BrowserModule)[];
}

@Injectable()
export abstract class DatePickerConfig {

    public defaultMomentTime = 'T12:00:00.0Z';

    constructor(config:Partial<DatePickerConfig> = {}) {
        Object.assign(this, config);
    }
}

