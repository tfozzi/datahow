import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitationTrendComponent } from './precipitation-trend.component';

describe('PrecipitationTrendComponent', () => {
  let component: PrecipitationTrendComponent;
  let fixture: ComponentFixture<PrecipitationTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecipitationTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecipitationTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
