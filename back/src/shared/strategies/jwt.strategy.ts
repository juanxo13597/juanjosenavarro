import { jwtConstants } from './../../constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/** strategia jwt auth */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /** constructor jwt */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /** validador de payload */
  async validate(payload: any) {
    return { email: payload.email };
  }
}
