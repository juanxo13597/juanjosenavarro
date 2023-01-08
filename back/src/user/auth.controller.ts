// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';
import { User } from './../entities/user.entity';
import { RegisterUserDto } from './../dtos/userRegister.dto';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @ApiBody({ type: RegisterUserDto, required: true })
  @Post('register')
  registerUser(
    @Body() newUser: RegisterUserDto,
  ): Promise<User | HttpException> {
    return this.AuthService.registerUser(newUser);
  }
}
