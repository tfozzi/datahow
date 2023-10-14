import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureAveragesComponent } from './temperature-averages.component';

describe('TemperatureAveragesComponent', () => {
  let component: TemperatureAveragesComponent;
  let fixture: ComponentFixture<TemperatureAveragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureAveragesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureAveragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
