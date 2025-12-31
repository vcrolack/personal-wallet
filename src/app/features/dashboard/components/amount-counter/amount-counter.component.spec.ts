import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountCounterComponent } from './amount-counter.component';

describe('AmountCounterComponent', () => {
  let component: AmountCounterComponent;
  let fixture: ComponentFixture<AmountCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
