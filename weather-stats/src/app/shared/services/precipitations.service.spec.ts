import { TestBed } from '@angular/core/testing';

import { PrecipitationsService } from './precipitations.service';

describe('PrecipitationsService', () => {
  let service: PrecipitationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecipitationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
