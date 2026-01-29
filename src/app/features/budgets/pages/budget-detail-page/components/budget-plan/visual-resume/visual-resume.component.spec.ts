import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualResumeComponent } from './visual-resume.component';

describe('VisualResumeComponent', () => {
  let component: VisualResumeComponent;
  let fixture: ComponentFixture<VisualResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
