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
  Query,
} from '@nestjs/common';
import { BlogService } from 'src/services/blog/blog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto } from 'src/dto/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/blog/update-blog.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('api/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAllBlog() {
    const blog = await this.blogService.getAllBlog();
    return { success: true, blog };
  }

  @Get('/filter')
  async filterBlog(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const blog = await this.blogService.filter(startDate, endDate);
    return { success: true, message: 'Filtered blogs fetched Properly', blog };
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
    const addBlog = await this.blogService.addBlog(
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
    const editBlog = await this.blogService.editBlog(id, updateBlogDto);
    return { success: true, editBlog };
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseIntPipe) id: number) {
    const deleteBlog = await this.blogService.deleteBlog(id);
    return { success: true, deleteBlog };
  }
}
