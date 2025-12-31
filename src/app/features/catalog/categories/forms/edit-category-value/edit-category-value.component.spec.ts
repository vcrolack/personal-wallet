import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryValueComponent } from './edit-category-value.component';

describe('EditCategoryValueComponent', () => {
  let component: EditCategoryValueComponent;
  let fixture: ComponentFixture<EditCategoryValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoryValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
