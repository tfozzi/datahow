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

  constructor(
    private currentLocationService: CurrentLocationService
  ) { }

  ngOnInit(): void {
    this.latitude = this.currentLocationService.latitude;
    this.longitude = this.currentLocationService.longitude;
    this.city = this.currentLocationService.city;
  }

}
