import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResponsesComponent } from './question-responses.component';

describe('QuestionResponsesComponent', () => {
  let component: QuestionResponsesComponent;
  let fixture: ComponentFixture<QuestionResponsesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionResponsesComponent]
    });
    fixture = TestBed.createComponent(QuestionResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
