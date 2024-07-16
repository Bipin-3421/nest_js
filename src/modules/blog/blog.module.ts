import { Module } from '@nestjs/common';
import { BlogService } from 'src/services/blog/blog.service';
import { BlogController } from 'src/controllers/blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { BlogPost } from 'src/entities/blog/blog-post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
