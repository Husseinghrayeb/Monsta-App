import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders()
  .append('Authorization', 'Basic ' + btoa(`${environment.API_KEY}:X`))

@Injectable({
  providedIn: 'root'
})
export class AppMonstaService {

  constructor(private http: HttpClient) { }

  public getStoreAppsRank = (store: string, date: string, country: string) => {
    const url = environment.APP_API + store + "/rankings.json?date=" + date + "&country=" + country;
    return this.http.get(url, {
      headers, responseType: "text"
    })

  }

  public getApp = (store: string, appId: string, country: string) => {
    const url = environment.APP_API + store + "/details/" + appId + ".json?country=" + country;
    return this.http.get(url, {
      headers, responseType: "text"
    })

  }

  public getAndroidGenreRankings = () => {
    // get android genre rankings then itunes genre rankings for the current date
    const androidUrl = environment.APP_API + "android/rankings/genres.json?date=2023-01-04";

    return this.http.get(androidUrl, {
      headers, responseType: "text"
    })
  }

  public getItunesGenreRankings = () => {
    const itunesUrl = environment.APP_API + "itunes/rankings/genres.json?date=2023-01-04";

    return this.http.get(itunesUrl, {
      headers, responseType: "text"
    })
  }

}
