import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataServiceService) { }

  subscription: Subscription = new Subscription();
  totalConfirmed = 0;
  totalActive = 0;
  totalRecovered = 0;
  totalDeaths = 0;
  globalData: GlobalDataSummary[] = [];

  ngOnInit(): void {
    this.getGlobalData();
  }

  getGlobalData() {
    this.subscription.add(this.dataService.getGlobalData().subscribe(
      (result: GlobalDataSummary[]) => {
        this.globalData = result;
        result.forEach((data: any) => {
          if (!Number.isNaN(data.confirmed)) {
            this.totalActive += data.active;
            this.totalConfirmed += data.confirmed;
            this.totalRecovered += data.recover;
            this.totalDeaths += data.deaths;
          }
        })
      }
    ))
  }

}
