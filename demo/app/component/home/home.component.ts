import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  form:FormGroup;
  date1: moment.Moment = null;
  date2: moment.Moment = null;
  date3: moment.Moment = null;

  yearFirstRegex = new RegExp(/^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})$/);

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      singlePicker: this.date1,
      dualPicker: {dateTo: this.date3, dateFrom: this.date2}
    });
  }

  onChange(src: string) {
    console.log(src);
  }

  ngOnDestroy() {
  }

}
