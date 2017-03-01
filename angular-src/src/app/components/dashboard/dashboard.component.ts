import { Component, OnInit } from '@angular/core';
//import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pieChartOptions:any = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Sleep', 7],
      ['Commute', 1],
      ['TV', 3],
    ],
    options: {'title': 'Tasks'},
  };

  constructor() { }

  ngOnInit() {
  }



}
