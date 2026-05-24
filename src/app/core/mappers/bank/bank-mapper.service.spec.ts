import { TestBed } from '@angular/core/testing';

import { BankMapperService } from '@core/mappers/bank/bank-mapper.service';

describe('BankMapperService', () => {
  let service: BankMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
