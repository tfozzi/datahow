import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "https://ipgeolocation.abstractapi.com/v1/?api_key=1e8a3b3ddfa84e3eb50c3833eaabcb98";

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  constructor(
    private http: HttpClient
  ) {
   }

  getData(){
    return this.http.get(API_URL);
  }
}
