import { UtilsService } from './../shared/services/utils.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

describe('UserController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UtilsService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('registerUser', () => {
    jest.spyOn(service, 'registerUser').mockImplementation(() =>
      Promise.resolve({
        id: 1,
        email: 'email@email.es',
        password: '123123',
        name: 'name',
        lastname: 'lastname',
        createdAt: new Date(),
        isActive: false,
      }),
    );
    expect(
      controller.registerUser({
        email: 'email@email.es',
        name: 'name',
        lastname: 'lastname',
        password: '123123',
      }),
    );
  });

  it('loginUser', () => {
    jest.spyOn(service, 'loginUser').mockImplementation(() =>
      Promise.resolve({
        access_token: 'sadfsdfsd',
      }),
    );
    expect(
      controller.loginUser({
        email: 'email@email.es',
        password: '123123',
      }),
    );
  });

  it('refreshToken', () => {
    jest.spyOn(service, 'refreshToken').mockImplementation(() =>
      Promise.resolve({
        access_token: 'asdasd',
      }),
    );
    expect(controller.refreshToken('Bearer sdfdsasdsd'));
  });
});
