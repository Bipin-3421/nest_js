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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBlogDto } from 'src/dto/create-blog.dto';
import { BlogService } from 'src/services/blog.service';
import { UpdateBlogDto } from 'src/dto/update-blog.dto';
import { ImageBlogDto } from 'src/dto/image-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  async getAllBlogs() {
    const blogs = await this.appService.getAllBlogs();
    return { success: true, blogs };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    const addBlog = await this.appService.addBlog(createBlogDto);
    return { message: 'Blog created successfully', success: true, addBlog };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async fileUpload(
    @Body() body: ImageBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // return console.log(file);
    return {
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };
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
    const editBlog = await this.appService.editBlog(id, updateBlogDto);
    return { success: true, editBlog };
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseIntPipe) id: number) {
    const deleteBlog = await this.appService.deleteBlog(id);
    console.log(deleteBlog);
    return { success: true, deleteBlog };
  }
}
