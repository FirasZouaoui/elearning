import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoursComponent } from './view-cours.component';

describe('ViewCoursComponent', () => {
  let component: ViewCoursComponent;
  let fixture: ComponentFixture<ViewCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCoursComponent]
    });
    fixture = TestBed.createComponent(ViewCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
