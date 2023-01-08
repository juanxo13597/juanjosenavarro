import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** guardian jwt auth */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
