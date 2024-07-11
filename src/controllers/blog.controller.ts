import { Controller, Get, Patch, Post, Delete } from '@nestjs/common';
import { BlogService } from 'src/services/blog.service';

@Controller()
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  getAllBlogs(): string[] {
    return this.appService.getAllBlogs();
  }

  @Post()
  createBlog() {}

  @Patch()
  editBlog() {}

  @Delete()
  deleteBlog() {}
}
