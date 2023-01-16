import { LoginPageModel } from './../pages/login/login-page.model';
import {
  RegisterUserResponseSuccess,
  LoginUserResponseSuccess,
} from './auth-service.model';
import { RegisterPageModel } from './../pages/register/register-page.model';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registerUser', (done: DoneFn) => {
    const user: FormGroup<RegisterPageModel> = new FormGroup({
      email: new FormControl('email@email.es'),
      password: new FormControl('123123'),
      name: new FormControl('name'),
      lastname: new FormControl('lastname'),
    });

    service.registerUser(user).subscribe({
      next: (resp: RegisterUserResponseSuccess) => {
        expect(resp).toEqual({
          email: 'email@email.es',
          name: 'name',
          lastname: 'lastname',
          id: 11,
          createdAt: '2023-01-10T09:46:25.000Z',
          isActive: false,
        });
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/user/auth/register');

    expect(req.request.method).toEqual('POST');

    req.flush({
      email: 'email@email.es',
      name: 'name',
      lastname: 'lastname',
      id: 11,
      createdAt: '2023-01-10T09:46:25.000Z',
      isActive: false,
    });
  });

  it('loginUser', (done: DoneFn) => {
    const user: FormGroup<LoginPageModel> = new FormGroup({
      email: new FormControl('email@email.es'),
      password: new FormControl('123123'),
    });

    service.loginUser(user).subscribe({
      next: (resp: LoginUserResponseSuccess) => {
        expect(resp).toEqual({
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZW1haWwiOiJqdWFuam9zZW5hdmFycm9wZXJlYUBnbWFpbC5jb20iLCJuYW1lIjoiSnVhbiBKb3PDqSIsImxhc3RuYW1lIjoiUGVyZWEiLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTEwVDA5OjUzOjQwLjAwMFoiLCJpc0FjdGl2ZSI6ZmFsc2V9LCJpYXQiOjE2NzM4OTQ3MjksImV4cCI6MTY3Mzg5ODMyOX0.7OhXwOhuMbLoBdjYW753ieILmBRLJ4hax-qLOpBm79c',
        });
        done();
      },
    });

    const req = httpTestingController.expectOne('/api/user/auth/login');

    expect(req.request.method).toEqual('POST');

    req.flush({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZW1haWwiOiJqdWFuam9zZW5hdmFycm9wZXJlYUBnbWFpbC5jb20iLCJuYW1lIjoiSnVhbiBKb3PDqSIsImxhc3RuYW1lIjoiUGVyZWEiLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTEwVDA5OjUzOjQwLjAwMFoiLCJpc0FjdGl2ZSI6ZmFsc2V9LCJpYXQiOjE2NzM4OTQ3MjksImV4cCI6MTY3Mzg5ODMyOX0.7OhXwOhuMbLoBdjYW753ieILmBRLJ4hax-qLOpBm79c',
    });
  });
});
