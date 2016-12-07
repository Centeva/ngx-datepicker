import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  date1: moment.Moment = moment("2012-05-16");
  date2: moment.Moment = moment("2016-11-25");
  date3: moment.Moment = moment("2016-12-25");

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
