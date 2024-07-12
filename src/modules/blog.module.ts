import { Module } from '@nestjs/common';
import { BlogService } from 'src/services/blog.service';
import { BlogController } from 'src/controllers/blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from 'src/entities/blog-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
