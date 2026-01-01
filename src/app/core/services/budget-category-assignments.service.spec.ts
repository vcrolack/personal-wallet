import { TestBed } from '@angular/core/testing';

import { BudgetCategoryAssignmentsService } from './budget-category-assignments.service';

describe('BudgetCategoryAssignmentsService', () => {
  let service: BudgetCategoryAssignmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetCategoryAssignmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
