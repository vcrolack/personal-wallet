import { TestBed } from '@angular/core/testing';

import { BankMapperService } from './bank-mapper.service';

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
