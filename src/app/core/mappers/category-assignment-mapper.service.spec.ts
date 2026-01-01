import { TestBed } from '@angular/core/testing';

import { CategoryAssignmentMapperService } from './category-assignment-mapper.service';

describe('CategoryAssignmentMapperService', () => {
  let service: CategoryAssignmentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAssignmentMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
