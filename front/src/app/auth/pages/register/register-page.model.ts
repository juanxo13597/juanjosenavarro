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

export interface SendModel {
  send: boolean;
  loading: boolean;
  message: string;
}
