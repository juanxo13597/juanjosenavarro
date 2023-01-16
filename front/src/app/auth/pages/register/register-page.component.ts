import { UtilsService } from './../../../shared/services/utils.service';
import { configConstants } from './../../../constants/config.constants';
import { RegisterUserResponseSuccess } from './../../services/auth-service.model';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RegisterPageModel, SendModel } from './register-page.model';

/** pagina registro */
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  /** tipado para el formulario */
  public registerForm: FormGroup<RegisterPageModel>;

  /** modelo para mostrar mensaje */
  public send: SendModel = {
    send: true,
    loading: false,
    message: '',
    error: false,
  };

  /**
   * constructor del registro
   * @param fb
   * @param AuthService
   */
  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private UtilsService: UtilsService
  ) {
    // change title
    this.UtilsService.changeTitle('Registro');
    /** inicializacion del form group */
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl(''),
      lastname: new FormControl(''),
    });
  }

  /** funcion submit del formulario de registro */
  public onSubmit(): void {
    this.send.loading = true;
    this.AuthService.registerUser(this.registerForm).subscribe({
      next: (resp: RegisterUserResponseSuccess) => {
        if (resp.status === 302) {
          this.send = {
            send: true,
            loading: false,
            message: 'El usuario ya existe.',
            error: true,
          };
        }
        if (resp.id) {
          this.send = {
            send: true,
            loading: false,
            message: 'Usuario registrado correctamente.',
            error: false,
          };
          this.registerForm.reset();
        }
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

    setTimeout(() => {
      this.send = { send: true, loading: false, message: '', error: false };
    }, configConstants.timeLoading);
  }
}
