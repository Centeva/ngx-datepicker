import { PickerMode } from './pickerMode';
import * as moment from 'moment';
export declare class Picker {
    numYearsShown: number;
    halfNumYearsShown: number;
    months: string[];
    years: number[];
    mode: PickerMode;
    date: moment.Moment;
    constructor();
    generateMonthData(): void;
    generateYearData(year: number): void;
    goPrev(): void;
    goNext(): void;
}
