import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST || 'localhost',
        port: 3306,
        username: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'juanjosenavarroperea',
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'front/dist'),
      exclude: ['/api/*'],
    }),
    UserModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
