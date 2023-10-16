import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const API_URL = "https://ipgeolocation.abstractapi.com/v1/?api_key=1e8a3b3ddfa84e3eb50c3833eaabcb98";

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  latitude: any;
  longitude: any;
  city: any;
  error: boolean;
  errorMessage: any;

  constructor(
    private http: HttpClient
  ) {
    this.error = false;
  }

  init(){
    return new Promise<void>((resolve, reject) => {
      this.http.get(API_URL).subscribe({
        next: (data: any) => {
          this.latitude = data.latitude;
          this.longitude = data.longitude;
          this.city = data.city;
          resolve();
          
        },
        error: (e: HttpErrorResponse) => {
          this.error = true;
          this.errorMessage = JSON.stringify(e.message);
          resolve();
        }
      });
    })
    
  }
}
