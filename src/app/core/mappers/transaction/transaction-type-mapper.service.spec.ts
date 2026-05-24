import { TestBed } from '@angular/core/testing';

import { TransactionTypeMapperService } from '@core/mappers/transaction/transaction-type-mapper.service';

describe('TransactionTypeMapperService', () => {
  let service: TransactionTypeMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionTypeMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
