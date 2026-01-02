import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryValueAndAssignmentComponent } from './create-category-value-and-assignment.component';

describe('CreateCategoryValueAndAssignmentComponent', () => {
  let component: CreateCategoryValueAndAssignmentComponent;
  let fixture: ComponentFixture<CreateCategoryValueAndAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoryValueAndAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryValueAndAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
