import { TestBed } from '@angular/core/testing';

import { TransactionTypeService } from '@core/services/transaction/transaction-type.service';

describe('TransactionTypeService', () => {
  let service: TransactionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
