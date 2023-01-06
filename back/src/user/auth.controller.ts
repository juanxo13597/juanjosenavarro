import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('profile')
  getUser(): any {
    const user = { prueba: 'prueba', id: 1 };
    return user;
  }
}
