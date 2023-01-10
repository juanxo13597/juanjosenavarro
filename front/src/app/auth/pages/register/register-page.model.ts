import { FormControl } from '@angular/forms';

/** modelo para registro */
export interface RegisterPageModel {
  /** email */
  email: FormControl<string | null>;

  /** password */
  password: FormControl<string | null>;

  /** nombre */
  name: FormControl<string | null>;

  /** apellidos */
  lastname: FormControl<string | null>;
}

/** modelo que controla si nos hemos registrado o no */
export interface SendModel {
  /** se ha enviado la peticion */
  send: boolean;

  /** esta cargando */
  loading: boolean;

  /** mensaje a mostrar */
  message: string;
}
