import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'front/dist'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
