/** modelo de respuesta de back al registrar a un usuario */
export type RegisterUserResponseSuccess = {
  email: string;
  name: string;
  lastname: string;
  createdAt: string;
  isActive: boolean;
  id?: number;

  response?: string;
  status?: number;
  message?: string;
};

/** modelo de respuesta de back del token al iniciar sesion */
export type LoginUserResponseSuccess = {
  status?: number;
  access_token: string;
};
