import { configConstants } from './../../../constants/config.constants';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';

describe('LoginComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [AuthService],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set send object with correct values', (done: DoneFn) => {
    spyOn(service, 'loginUser').and.returnValue(
      of({
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZW1haWwiOiJqdWFuam9zZW5hdmFycm9wZXJlYUBnbWFpbC5jb20iLCJuYW1lIjoiSnVhbiBKb3PDqSIsImxhc3RuYW1lIjoiUGVyZWEiLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTEwVDA5OjUzOjQwLjAwMFoiLCJpc0FjdGl2ZSI6ZmFsc2V9LCJpYXQiOjE2NzM4OTQ3MjksImV4cCI6MTY3Mzg5ODMyOX0.7OhXwOhuMbLoBdjYW753ieILmBRLJ4hax-qLOpBm79c',
      })
    );
    component.onSubmit();

    expect(component.send).toEqual({
      send: true,
      loading: false,
      message: 'Inicio de sesión correcto.',
      error: false,
    });

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(service.loginUser).toHaveBeenCalled();

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

  it('should set send object with login fail', (done: DoneFn) => {
    spyOn(service, 'loginUser').and.returnValue(
      of({
        access_token: '',
        status: 403,
      })
    );
    component.onSubmit();

    expect(component.send).toEqual({
      send: true,
      loading: false,
      message: 'Inicio de sesion incorrecto.',
      error: true,
    });

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(service.loginUser).toHaveBeenCalled();

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

  it('should set send object and fail http', () => {
    spyOn(service, 'loginUser').and.returnValue(
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
    expect(service.loginUser).toHaveBeenCalled();
  });
});
