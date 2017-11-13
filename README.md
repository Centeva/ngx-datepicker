# ct-ngx-datepticker [![Build Status](https://travis-ci.org/Centeva/ngx-datepicker.svg?branch=master)](https://travis-ci.org/Centeva/ngx-datepicker)

## Introduction

A single and dual date picker, written for angular 2+ projects.

## Code Samples
Setup
```
import { DatePickerUtil, DatePickerConfig } from 'ct-ngx-datepicker';

...

class MyDatePickerConfig extends DatePickerConfig {
	
}

...

DatePickerUtil.forRoot(new MyDatePickerConfig())
```

Config is optional, more details to come on what options are configurable. 

Usage Example 
```
<ct-date-picker [(date)]="date1" zIndex="100" formControlName="singlePicker">
    <input #date class="form-control" />
</ct-date-picker>
```
```
<ct-dual-picker [(dateFrom)]="date2" [(dateTo)]="date3" zIndex="100" formControlName="dualPicker">
    <input #dateFrom class="form-control" />
    <input #dateTo class="form-control" />
 </ct-dual-picker>
```

## Installation

```
npm install --save ct-ngx-datepicker    
```

## Usage
### Single datepicker
```
<ct-date-picker [(date)]="date1" zIndex="100" formControlName="singlePicker">
    <input #date class="form-control" />
</ct-date-picker>
```
Wrap a input field in the <ct-date-picker> element. Mark the input field with #date

#### Single datepicker parameters
 * date - date model
 * dateChange - Event emitter for notification of date changes
 * zIndex - Allows specification of a custom z-index for the picker.
 * minDate - Minimum allowed date.
 * maxDate - Maximum allowed date.
 * ~~match - Optional regex for properly parsing typed in dates, e.g. mm/dd/yyyy~~ Removed in version 4.0.0
 * globalMode - Sets the starting mode for selecting a date, e.g. Calendar, Year. If no value is specified, Calendar mode is implied.


### Dual Date Picker
```
<ct-dual-picker [(dateFrom)]="date2" [(dateTo)]="date3" zIndex="100" formControlName="dualPicker">
    <input #dateFrom class="form-control" />
    <input #dateTo class="form-control" />
 </ct-dual-picker>
```
Wrap two input fields in the <ct-dual-picker> element. Mark each input #dateFrom and #dateTo respectively.

#### Dual datepicker parameters
 * dateFrom - date model
 * dateTo - date model
 * dateFromChange - Event emitter for notification of date changes
 * dateToChange - Event emitter for notification of date changes
 * zIndex - Allows specification of a custom z-index for the picker.
 * minDate - Minimum allowed date.
 * maxDate - Maximum allowed date.
 * ~~match - Optional regex for properly parsing typed in dates, e.g. mm/dd/yyyy~~ Removed in version 4.0.0
 * globalMode - Sets the starting mode for selecting a date, e.g. Calendar, Year. If no value is specified, Calendar mode is implied.

## Requirements
- Angular 2+ (common, core, forms)
- jQuery 3+ (see note below)
- moment 2

### Why jQuery?
I have already implemented the datepicker using the renderer class to support Angular Universal Apps, and avoid needing jQuery. However at this time renderer is experimental. When it is no longer experimental the code will be updated.

### Why moment?
Because the datepicker returns a moment date, not a string.


## Release Notes
 - 4.3.1 - Fix IE bug dealing with two digit year values. Should give you a "valid" year now.
 - 4.3.0 - Move html for the datepicker out to the body to prevent issues with z-index and absolute positioning when translations are applied.
 - 4.2.4 - Fix bug where setting a from date, then clicking to date (dualpicker) without selecting a date and then clicking back into the from date causes an exception because dateTo is undefined.
 - 4.2.3 - Fix bug where dual picker is hidden when clicking on the to input.
 - 4.2.2 - Make jquery typings a dependency, remove unneded styling.
 - 4.2.0 - Date picker is now positioned fixed so it can overflow outside of containers with overflow: hidden/auto.
 - 4.1.0 - Modify positioning on input element to correct location of above positioned date picker.
 - 4.0.5 - Prevent date correction on dual picker from happening till focus is lost on the input.
 - 4.0.4 - This version cannot be found.
 - 4.0.2 - 4.0.3 -- Update the calendar when the minDate / maxDate changes.
 - 4.0.1 -- Include a UMD, because forgetting it breaks the whole thing.
 - 4.0.0 -- Bug fixes for: Positioning of the picker and the min/max windowing if today is outside. Removed the match regex option.
 - 3.2.1 - 3.2.2 -- Remove DatePickerConfig for now, until it's ready for prime time.
 - 3.0.0 - 3.2.0 -- Merge fix for changeDate being called more than once. Merge fix for the date getter using the minDate if no date value is supplied.
 - 2.5.3 -- Update ViewChild syntax. Also fix extra padding, which moved the picker off the input box.
 - 2.5.0 -- Ability to specify a minDate without a maxDate for validation
 - 2.4.0 -- Add ability to specify calendar default mode (globalMode), e.g. month/year.
 - 2.2.3 -- Remove sourcemap from dist build.
 - 2.2.2 -- Fixed bug where dates weren't invalid when cleared
 - 2.2.1 -- Fixed bug with validation on dual date picker.
 - 2.2.0 -- Added regex matching for date validation
 - 2.1.0 -- Added ability to validate dates on range, and moment.isValid
 - 2.0.0 -- Removed unused api parameters. Added basic validation for reactive forms.
 - 1.0.2 -- Notice about new repo. 
 - 1.0.1 -- Unspecified bug fixes (sorry, just starting to do this right)
 - 1.0.0 -- Initial Release

 ## Migration Notes
 * From 1.x to 2.x
 ..* Remove references to ctDisabled and inputClass from the datepickers. Instead apply those directly to the transcluded input.
 * From 2.x to 3.x
 ..* We attempted an overhaul of the config, but then aborted. No migration needed if on > 3.2.0
 * From 3.x to 4.x 
 ..* Remove the match binding (if used). 

## Known Bug
- When using an ISO date (yyyy-mm-dd), the day selected on the calendar picker ends uup being localized for your timezone.