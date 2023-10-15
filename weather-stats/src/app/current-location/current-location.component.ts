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
    this.currentLocationService.getData().subscribe((response: any) => {
      console.log(JSON.stringify(response));
      this.latitude = response.latitude;
      this.longitude = response.longitude;
      this.city = response.city;
    });
  }

}
