import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BlogModule } from './modules/blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appSetting } from './config/appSetting';
import { BlogPost } from './entities/blog/blog-post.entity';
import { authMiddleware } from './middlewares/auth/auth.middleware';
import { BlogController } from './controllers/blog.controller';
import { AuthModule } from './modules/user/user.module';
import { User } from './entities/user/user.entity';

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
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes(BlogController);
  }
}
