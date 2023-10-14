import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureTrendComponent } from './temperature-trend.component';

describe('TemperatureTrendComponent', () => {
  let component: TemperatureTrendComponent;
  let fixture: ComponentFixture<TemperatureTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
