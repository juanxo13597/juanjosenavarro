import { RegisterUserResponseSuccess } from './auth-service.model';
import { endpointsConstants } from './../../constants/endpoints.constants';
import { FormGroup } from '@angular/forms';
import { RegisterPageModel } from './../pages/register/register-page.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** servicio para autentificacion */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * constructor del servicio
   * @param Httpclient
   */
  constructor(private Httpclient: HttpClient) {}

  /**
   * peticion a back para registrar un nuevo usuario
   * @param user<{email:string, password:string, name:string, lastname:string}>
   * @returns
   */
  public registerUser(
    user: FormGroup<RegisterPageModel>
  ): Observable<RegisterUserResponseSuccess> {
    return this.Httpclient.post<RegisterUserResponseSuccess>(
      endpointsConstants.registerUser,
      user.value
    );
  }
}
