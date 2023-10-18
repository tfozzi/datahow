import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempErrorBarsComponent } from './temp-error-bars.component';

describe('TempErrorBarsComponent', () => {
  let component: TempErrorBarsComponent;
  let fixture: ComponentFixture<TempErrorBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempErrorBarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempErrorBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
