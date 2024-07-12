import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateBlogDto } from 'src/dto/create-blog.dto';
import { BlogService } from 'src/services/blog.service';
import { UpdateBlogDto } from 'src/dto/update-blog.dto';
@Controller()
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  async getAllBlogs() {
    const blogs = await this.appService.getAllBlogs();
    return { success: true, blogs };
  }

  @Post()
  @HttpCode(201)
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    const addBlog = await this.appService.addBlog(createBlogDto);
    return { message: 'Blog created successfully', success: true, addBlog };
  }

  @Patch(':id')
  async editBlog(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    console.log(id, typeof id);
    const editBlog = await this.appService.editBlog(id, updateBlogDto);
    return { success: true };
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseIntPipe) id: number) {
    // const deleteBlog = await this.appService;
  }
}
