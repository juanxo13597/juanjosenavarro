import { LoginUserDto } from './../dtos/userLogin.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UtilsService } from '../shared/services/utils.service';
import { RegisterUserDto } from './../dtos/userRegister.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/** servicio de autentificacion */
@Injectable()
export class AuthService {
  /**
   * constructor del servicio de autentificacion
   * @param userRepository
   * @param UtilsService
   */
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private UtilsService: UtilsService,
  ) {}

  /**
   * todo: metodo para registrar un nuevo usuario
   * @param user
   * @returns
   */
  async registerUser(user: RegisterUserDto): Promise<User | HttpException> {
    // *[VALIDATION]
    // !-params required
    if (!this.UtilsService.validationExistParams(user, ['email', 'password'])) {
      return new HttpException(
        'No send all params required',
        HttpStatus.BAD_REQUEST,
      );
    }
    // !-email format
    if (!this.UtilsService.validatedEmail(user.email)) {
      return new HttpException('Invalid format email', HttpStatus.BAD_REQUEST);
    }
    // !-user not found
    if (await this.findUserByEmail(user.email)) {
      return new HttpException('User already exits', HttpStatus.FOUND);
    }

    // ? Register user

    const { password } = user;
    const passwordHash = await hash(password, 10);

    user = { ...user, password: passwordHash };

    const newUser = await this.userRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  /**
   * metodo para iniciar sesion del usuario
   * @param user
   * @returns
   */
  async login(user: LoginUserDto) {
    // ! -validated params
    if (!this.UtilsService.validationExistParams(user, ['email', 'password'])) {
      return new HttpException(
        'No send all params required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { email, password } = user;
    const findUser = await this.findUserByEmail(email);

    // ! -validated email
    if (!findUser) {
      return new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    // ! -validated password
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) {
      return new HttpException('invalid password', HttpStatus.FORBIDDEN);
    }

    const data = findUser;

    return data;
  }

  /**
   * todo: metodo para validar si un usuario existe o no en bbdd buscando el email
   * @param email
   * @returns
   */
  private async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
