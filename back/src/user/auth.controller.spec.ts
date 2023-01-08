import { authMock } from './../mocks/auth.mock';
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
    jest
      .spyOn(service, 'registerUser')
      .mockImplementation(() => Promise.resolve(authMock.registerUserDtoRes));
    expect(controller.registerUser(authMock.registerUserDtoReq));
  });

  it('loginUser', () => {
    jest
      .spyOn(service, 'loginUser')
      .mockImplementation(() => Promise.resolve(authMock.loginUserRes));
    expect(controller.loginUser(authMock.loginUserReq));
  });

  it('refreshToken', () => {
    jest
      .spyOn(service, 'refreshToken')
      .mockImplementation(() => Promise.resolve(authMock.refreshTokenRes));
    expect(controller.refreshToken('Bearer sdfdsasdsd'));
  });
});
