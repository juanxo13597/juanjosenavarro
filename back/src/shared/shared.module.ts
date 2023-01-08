import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { UtilsService } from './services/utils.service';

@Module({
  providers: [UtilsService, JwtStrategy, JwtAuthGuard],
  exports: [UtilsService, JwtStrategy, JwtAuthGuard],
})
export class SharedModule {}
