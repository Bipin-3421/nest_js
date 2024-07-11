import { Module } from '@nestjs/common';
import { BlogService } from 'src/services/app.service';
import { BlogController } from 'src/controllers/blog.controller';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
