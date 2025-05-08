import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyResponseComponent } from './modify-response.component';

describe('ModifyResponseComponent', () => {
  let component: ModifyResponseComponent;
  let fixture: ComponentFixture<ModifyResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyResponseComponent]
    });
    fixture = TestBed.createComponent(ModifyResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
