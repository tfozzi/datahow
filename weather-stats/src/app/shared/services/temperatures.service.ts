import { Injectable } from '@angular/core';
import { CurrentLocationService } from './current-location.service';
import { HttpClient } from '@angular/common/http';


// this URL provides both historical and forecast tempratures (from -7 to +7 days)
const API_BASE_URL = "https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m&past_days=7";
@Injectable({
  providedIn: 'root'
})
export class TemperaturesService {

  private apiUrl: any;

  constructor(
    private currentLocationService: CurrentLocationService,
    private http: HttpClient
  ) { 
    this.apiUrl = API_BASE_URL + "&latitude=" + this.currentLocationService.latitude + "&longitude=" + this.currentLocationService.longitude;
  }

  getData(){
    return this.http.get(this.apiUrl);
  }
}
