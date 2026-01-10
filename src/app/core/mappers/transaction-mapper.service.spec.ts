import { TestBed } from '@angular/core/testing';

import { TransactionMapperService } from './transaction-mapper.service';

describe('TransactionMapperService', () => {
  let service: TransactionMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
