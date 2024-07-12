import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  HttpCode,
  Body,
} from '@nestjs/common';
import { CreateBlogDto } from 'src/dto/create-blog.dto';
import { BlogService } from 'src/services/blog.service';

@Controller()
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  getAllBlogs(): string[] {
    return this.appService.getAllBlogs();
  }

  @Post()
  @HttpCode(201)
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    const blog = this.appService.addBlog(createBlogDto);
    return { message: 'Blog created successfully', success: true, blog };
  }

  @Patch()
  editBlog() {}

  @Delete()
  deleteBlog() {}
}
