import { ApiProperty } from '@nestjs/swagger';

/**
 * modelo de dto para login
 */
export class LoginUserDto {
  /** email del usuario */
  @ApiProperty({ required: true })
  email: string;

  /** contraseña del usuario */
  @ApiProperty({ required: true })
  password?: string;
}
