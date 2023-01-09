/** modelo de respuesta de back al registrar a un usuario */
export type RegisterUserResponseSuccess = {
  email: string;
  name: string;
  lastname: string;
  id: number;
  createdAt: string;
  isActive: boolean;

  response?: string;
  status?: number;
  message?: string;
};
