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

  public style() {
    const url = 'https://api.appmonsta.com/v1/stores/android/ids';

    return this.http.get<any>(url, {
      headers: headers
    })

  }

}
