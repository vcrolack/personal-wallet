import { TestBed } from '@angular/core/testing';

import { BudgetCategoryValuesService } from './budget-category-values.service';

describe('BudgetCategoryValuesService', () => {
  let service: BudgetCategoryValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetCategoryValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
