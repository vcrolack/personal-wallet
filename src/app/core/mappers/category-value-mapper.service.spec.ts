import { TestBed } from '@angular/core/testing';

import { CategoryValueMapperService } from '@core/mappers/category-value-mapper.service';

describe('CategoryValueMapperService', () => {
  let service: CategoryValueMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryValueMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
