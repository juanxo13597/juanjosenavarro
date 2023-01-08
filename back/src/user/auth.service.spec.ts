import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from './../shared/services/utils.service';
import { User } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: AuthService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    repo = module.get<Repository<User>>(getRepositoryToken(User));
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser and ', () => {
    it(' all success', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(repo, 'save').mockResolvedValueOnce({
        email: 'email@email.es',
        id: 1,
        createdAt: new Date(),
        isActive: false,
        lastname: 'apellido',
        name: 'nombre',
        password: '123123',
      });

      expect(
        await service.registerUser({
          email: 'email@email.es',
          lastname: 'apellido',
          name: 'nombre',
          password: '123123',
        }),
      ).toBeTruthy();
    });

    it(' invalid params', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      expect(
        await service.registerUser({
          email: 'email@email.es',
          lastname: 'apellido',
          name: 'nombre',
        }),
      ).toEqual(
        new HttpException(
          'No send all params required',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it(' invalid email', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      expect(
        await service.registerUser({
          email: 'emailemail.es',
          lastname: 'apellido',
          name: 'nombre',
          password: '123123',
        }),
      ).toEqual(
        new HttpException('Invalid format email', HttpStatus.BAD_REQUEST),
      );
    });

    it(' user found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce({
        email: 'email@email.esz',
        name: 'nombre',
        lastname: 'apellido',
        id: 6,
        password: '123123',
        createdAt: new Date(),
        isActive: false,
      });

      expect(
        await service.registerUser({
          email: 'email@email.es',
          lastname: 'apellido',
          name: 'nombre',
          password: '123123',
        }),
      ).toEqual(new HttpException('User already exits', HttpStatus.FOUND));
    });
  });
});
