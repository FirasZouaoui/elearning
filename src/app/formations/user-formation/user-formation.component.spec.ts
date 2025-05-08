import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormationComponent } from './user-formation.component';

describe('UserFormationComponent', () => {
  let component: UserFormationComponent;
  let fixture: ComponentFixture<UserFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormationComponent]
    });
    fixture = TestBed.createComponent(UserFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
