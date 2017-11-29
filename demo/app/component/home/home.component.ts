import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  form: FormGroup;
  nonInlineForm:FormGroup;
  dynamicDateForm:FormGroup;
  // date1: moment.Moment = moment("2017-06-16");
  date1: moment.Moment = null;
  date2: moment.Moment = null;
  date3: moment.Moment = null;

  minDateArray = [ moment('2017-06-16'), moment('2020-01-20'), moment('1999-10-05')];
  selectedMinDate: moment.Moment = null;
  selectedMaxDate: moment.Moment = null;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      singlePicker: this.date1,
      dualPicker: {dateTo: this.date3, dateFrom: this.date2}
    });

    this.nonInlineForm = this.fb.group({
      singlePicker: this.date1,
      dualPicker: {dateTo: this.date3, dateFrom: this.date2}
    });

    this.dynamicDateForm = this.fb.group({
      selectedMinDate: null,
      singlePicker: this.date1,
      dualPicker: {dateTo: this.date3, dateFrom: this.date2}
    });
  }

  updateMaxDate(val: FormControl) {
    this.selectedMaxDate = moment(val.value).add(1, 'month');
  }


  onChange(src: string) {
    console.log(src);
  }

  ngOnDestroy() {
  }

}
