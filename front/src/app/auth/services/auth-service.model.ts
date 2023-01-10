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
