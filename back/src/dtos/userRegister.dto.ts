import { ApiProperty } from '@nestjs/swagger';

/**
 * modelo de dto para registro de usuarios
 */
export class RegisterUserDto {
  /** email */
  @ApiProperty({ required: true })
  email: string;

  /** password */
  @ApiProperty({ required: true })
  password: string;

  /** nombre del usuario */
  @ApiProperty({ required: false })
  name: string;

  /** apellido del usuario */
  @ApiProperty({ required: false })
  lastname: string;
}
