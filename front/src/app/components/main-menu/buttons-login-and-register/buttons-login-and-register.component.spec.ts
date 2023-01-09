import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsLoginAndRegisterComponent } from './buttons-login-and-register.component';

describe('ButtonsLoginAndRegisterComponent', () => {
  let component: ButtonsLoginAndRegisterComponent;
  let fixture: ComponentFixture<ButtonsLoginAndRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsLoginAndRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonsLoginAndRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
