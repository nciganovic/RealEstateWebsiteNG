import { TestBed } from '@angular/core/testing';

import { BestservicesService } from './bestservices.service';

describe('BestservicesService', () => {
  let service: BestservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
