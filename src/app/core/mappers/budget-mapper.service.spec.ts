import { TestBed } from '@angular/core/testing';

import { BudgetMapperService } from './budget-mapper.service';

describe('BudgetMapperService', () => {
  let service: BudgetMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
