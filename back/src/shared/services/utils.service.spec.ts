import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validatedEmail', () => {
    expect(service.validatedEmail('email@email.es')).toEqual(true);
    expect(service.validatedEmail('emailemail.es')).toEqual(false);
  });

  it('validationExistParams', () => {
    const objeto = { key1: 'key1' };
    const array = ['key1'];
    expect(service.validationExistParams(objeto, array)).toEqual(true);
    array.push('key2');
    expect(service.validationExistParams(objeto, array)).toEqual(false);
  });
});
