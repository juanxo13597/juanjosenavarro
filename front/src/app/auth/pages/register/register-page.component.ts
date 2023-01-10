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
  public send: SendModel = { send: true, loading: false, message: '' };

  /**
   * constructor del registro
   * @param fb
   * @param AuthService
   */
  constructor(private fb: FormBuilder, private AuthService: AuthService) {
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
          };
        }
        if (resp.id) {
          this.send = {
            send: true,
            loading: false,
            message: 'Usuario registrado correctamente.',
          };
          this.registerForm.reset();
        }
      },
      error: () => {
        this.send = { send: true, loading: false, message: 'ERROR HTTP' };
      },
    });

    setTimeout(() => {
      this.send = { send: true, loading: false, message: '' };
    }, configConstants.timeLoading);
  }
}
