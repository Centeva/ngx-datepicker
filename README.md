# ct-ngx-datepticker

## Introduction

A single and dual date picker, written for angular 2+ projects.

## Code Samples

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
npm install --save ct-ng2-datepicker    
```

## Requirements
- Angular 2+ (common, core, forms)
- jQuery 3+ (see note below)
- moment 2

### Why jQuery?
I have already implemented the datepicker using the renderer class to support Angular Universal Apps, and avoid needing jQuery. However at this time renderer is experimental. When it is no longer experimental the code will be updated.

### Why moment?
Because the datepicker returns a moment date, not a string.



