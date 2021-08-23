import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})

//feelfreetocode angular courese

export class DataServiceService {

  //private gloabl_data ='https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_daily_reports/12-31-2020.csv';

  private globaldata = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/01-01-2021.csv`;

  constructor(private http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globaldata, { responseType: 'text' }).pipe(map(
      (result) => {
        let rows = result.split('\n');
        rows.splice(0, 1);
        let data: GlobalDataSummary[] = [];
        let raw: any = {};
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recover: +cols[9],
            active: +cols[10]
          };

          let temp : any = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.recover = cs.recover + temp.recover;
            temp.deaths = cs.deaths + temp.deaths;
            temp.confirmed = cs.confirmed + temp.confirmed;
            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
        })
          return Object.values(raw) as GlobalDataSummary[];

      }));
  }


}
