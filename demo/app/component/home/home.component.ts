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
  date1: moment.Moment = moment("2012-05-16");
  date2: moment.Moment = moment("2016-11-25");
  date3: moment.Moment = moment("2016-12-25");

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      singlePicker: this.date1,
      dualPicker: {dateTo: this.date3, dateFrom: this.date2}
    });
  }

  ngOnDestroy() {
  }

}
