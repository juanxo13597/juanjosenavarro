import { LoginUserDto } from './../dtos/userLogin.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';
import { User } from './../entities/user.entity';
import { RegisterUserDto } from './../dtos/userRegister.dto';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

/**
 * controlador de autentificacion
 */
@Controller('auth')
export class AuthController {
  /**
   * constructor de autentificacion
   * @param AuthService
   */
  constructor(private AuthService: AuthService) {}

  /**
   * todo: endpoint para registrar nuevo usuario
   * @param newUser
   * @returns
   */
  @ApiBody({ type: RegisterUserDto, required: true })
  @Post('register')
  registerUser(
    @Body() newUser: RegisterUserDto,
  ): Promise<User | HttpException> {
    return this.AuthService.registerUser(newUser);
  }
  /**
   * todo: endpoint para login de usuario
   * @param user
   * @returns
   */
  @ApiBody({ type: LoginUserDto, required: true })
  @Post('login')
  loginUser(@Body() user: LoginUserDto): Promise<User | HttpException> {
    return this.AuthService.login(user);
  }
}
