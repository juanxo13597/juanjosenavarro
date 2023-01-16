import { configConstants } from './../../../constants/config.constants';
import { LoginPageModel } from './login-page.model';
import { AuthService } from './../../services/auth.service';
import { SendModel } from './../login/login-page.model';
import { UtilsService } from '../../../shared/services/utils.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

/** pagina de inicio sesion */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  /** modelo para mostrar mensaje */
  public send: SendModel = {
    send: true,
    loading: false,
    message: '',
    error: false,
  };

  /** tipado para el formulario */
  public loginForm: FormGroup<LoginPageModel>;

  /** constructor */
  constructor(
    private UtilsService: UtilsService,
    private fb: FormBuilder,
    private AuthService: AuthService
  ) {
    // change title
    this.UtilsService.changeTitle('Inicio de sesión');
    /** inicializacion del form group */
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  /** metodo para iniciar sesion */
  onSubmit(): void {
    this.send.loading = true;
    this.AuthService.loginUser(this.loginForm).subscribe({
      next: (resp) => {
        if (resp.status === 403) {
          this.send = {
            send: true,
            loading: false,
            message: 'Inicio de sesion incorrecto.',
            error: true,
          };
        }
        if (resp.access_token) {
          this.send = {
            send: true,
            loading: false,
            message: 'Inicio de sesión correcto.',
            error: false,
          };
          this.loginForm.reset();
        }
        setTimeout(() => {
          this.send = { send: true, loading: false, message: '', error: false };
        }, configConstants.timeLoading);
      },
      error: () => {
        this.send = {
          send: true,
          loading: false,
          message: 'ERROR HTTP',
          error: true,
        };
      },
    });
  }
}
