import { Controller, Get } from '@nestjs/common';
import { BlogService } from 'src/services/app.service';

@Controller()
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  getAllBlogs(): string {
    return this.appService.getHello();
  }
}
