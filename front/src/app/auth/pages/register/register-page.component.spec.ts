import { configConstants } from './../../../constants/config.constants';
import { AuthService } from './../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPageComponent],
      providers: [AuthService],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
    service = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set send object with correct values', (done: DoneFn) => {
    spyOn(service, 'registerUser').and.returnValue(
      of({
        id: 1,
        email: 'email@email.es',
        name: 'name',
        lastname: 'lastname',
        isActive: true,
        createdAt: 'z1',
      })
    );
    component.onSubmit();

    expect(component.send).toEqual({
      send: true,
      loading: false,
      message: 'Usuario registrado correctamente.',
      error: false,
    });

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(service.registerUser).toHaveBeenCalled();

    setTimeout(() => {
      expect(component.send).toEqual({
        send: true,
        loading: false,
        message: '',
        error: false,
      });
      done();
    }, configConstants.timeLoading + 1000);
  });

  it('should set send object with 302', () => {
    spyOn(service, 'registerUser').and.returnValue(
      of({
        email: 'email@email.es',
        name: 'name',
        lastname: 'lastname',
        isActive: true,
        createdAt: 'z1',
        status: 302,
      })
    );
    component.onSubmit();

    expect(component.send).toEqual({
      send: true,
      loading: false,
      message: 'El usuario ya existe.',
      error: true,
    });

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(service.registerUser).toHaveBeenCalled();
  });

  it('should set send object and error', () => {
    spyOn(service, 'registerUser').and.returnValue(
      throwError(() => {
        return { status: 500, message: 'Internal server error' };
      })
    );
    component.onSubmit();

    expect(component.send).toEqual({
      send: true,
      loading: false,
      message: 'ERROR HTTP',
      error: true,
    });

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(service.registerUser).toHaveBeenCalled();
  });
});
