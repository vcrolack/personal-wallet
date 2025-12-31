import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryValueComponent } from './create-category-value.component';

describe('CreateCategoryValueComponent', () => {
  let component: CreateCategoryValueComponent;
  let fixture: ComponentFixture<CreateCategoryValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoryValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
