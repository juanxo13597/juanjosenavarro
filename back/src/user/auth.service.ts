// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UtilsService } from '../shared/services/utils.service';
import { RegisterUserDto } from './../dtos/userRegister.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private UtilsService: UtilsService,
  ) {}

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
    const userFound = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (userFound) {
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
}
