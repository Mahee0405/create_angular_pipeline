import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  globalData: GlobalDataSummary[]=[];
  countries: any[]=[];
  subscriptions = new Subscription();

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(){
    this.subscriptions.add(this.dataService.getGlobalData().subscribe(result =>{
      this.globalData = result;
      this.globalData.forEach((cs)=>{
       console.log(cs.country);
        this.countries.push(cs.country);
      })
    }))
  }

}
