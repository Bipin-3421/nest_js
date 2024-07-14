import { Module } from '@nestjs/common';
import { BlogService } from 'src/services/blog.service';
import { BlogController } from 'src/controllers/blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from 'src/entities/blog-post.entity';
import { MulterModule } from '@nestjs/platform-express';

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
