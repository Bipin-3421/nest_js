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
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from 'src/services/blog/blog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto } from 'src/dto/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/blog/update-blog.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/blog')
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  async getAllBlogs() {
    const blogs = await this.appService.getAllBlogs();
    return { success: true, blogs };
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(201)
  async createBlog(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ) {
    const { title, overview, description } = createBlogDto;
    const userId = req.user;
    const addBlog = await this.appService.addBlog(
      title,
      overview,
      description,
      image,
      userId.sub,
    );
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
    const editBlog = await this.appService.editBlog(id, updateBlogDto);
    return { success: true, editBlog };
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseIntPipe) id: number) {
    const deleteBlog = await this.appService.deleteBlog(id);
    return { success: true, deleteBlog };
  }
}
