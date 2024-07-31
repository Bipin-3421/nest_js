import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BlogModule } from './modules/blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appSetting } from './config/appSetting';
import { BlogPost } from './entities/blog/blog-post.entity';
import { UserModule } from './modules/user/user.module';
import { User } from './entities/user/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: appSetting.password,
      database: 'blog',
      entities: [User, BlogPost],
      synchronize: true,
    }),
    BlogModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
