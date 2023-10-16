import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from '../shared/services/current-location.service';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.css']
})
export class CurrentLocationComponent implements OnInit {

  latitude: any;
  longitude: any;
  city: any;
  dataError: boolean;
  errorMessage: any;

  constructor(
    private currentLocationService: CurrentLocationService
  ) { 
    this.dataError = false;
  }

  ngOnInit(): void {
    if (this.currentLocationService.error) {
      this.dataError = true;
      this.errorMessage = this.currentLocationService.errorMessage;
    }
    else {
      this.latitude = this.currentLocationService.latitude;
      this.longitude = this.currentLocationService.longitude;
      this.city = this.currentLocationService.city;
    }
  }

}
