import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { CurrentLocationComponent } from './current-location/current-location.component';
import { TemperatureTrendComponent } from './temperature-trend/temperature-trend.component';
import { TemperatureAveragesComponent } from './temperature-averages/temperature-averages.component';
import { PrecipitationTrendComponent } from './precipitation-trend/precipitation-trend.component';
import { CurrentLocationService } from './shared/services/current-location.service';

export function loadLocation(currentLocationService: CurrentLocationService) {
  return (): Promise<any> => {
    return currentLocationService.init();
  }
  
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    CurrentLocationComponent,
    TemperatureTrendComponent,
    TemperatureAveragesComponent,
    PrecipitationTrendComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule
  ],
  providers: [
    { 
      provide: APP_INITIALIZER,
      useFactory: loadLocation,
      deps: [CurrentLocationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
