import { Module } from '@nestjs/common';
import { BlogModule } from './modules/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appSetting } from './config/appSetting';
import { BlogPost } from './entities/blog-post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: appSetting.password,
      database: 'blog',
      entities: [BlogPost],
      synchronize: true,
    }),
    BlogModule,
  ],
})
export class AppModule {}
