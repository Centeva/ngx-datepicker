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
  date1: moment.Moment = undefined;
  date2: moment.Moment = undefined;
  date3: moment.Moment = undefined;

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
