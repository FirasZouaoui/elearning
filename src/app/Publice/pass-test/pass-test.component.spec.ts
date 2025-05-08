import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassTestComponent } from './pass-test.component';

describe('PassTestComponent', () => {
  let component: PassTestComponent;
  let fixture: ComponentFixture<PassTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassTestComponent]
    });
    fixture = TestBed.createComponent(PassTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
