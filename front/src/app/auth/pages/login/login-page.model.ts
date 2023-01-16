import { FormControl } from '@angular/forms';
/** modelo para registro */
export interface LoginPageModel {
  /** email */
  email: FormControl<string | null>;

  /** password */
  password: FormControl<string | null>;
}

/** modelo que controla si nos hemos logeado o no */
export interface SendModel {
  /** se ha enviado la peticion */
  send: boolean;

  /** esta cargando */
  loading: boolean;

  /** mensaje a mostrar */
  message: string;

  /** comprobar si el mensaje es de error o no */
  error: boolean;
}
