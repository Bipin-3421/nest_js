import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  HttpStatus,
  Body,
  Param,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Req,
  Query,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { BlogService } from 'src/services/blog/blog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto, ResponseBlogDto } from 'src/dto/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/blog/update-blog.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Blog')
@ApiBearerAuth()
@Controller('api/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAllBlog(@Res() res: Response) {
    const blog = await this.blogService.getAllBlog();
    return res.status(200).json({
      success: true,
      contentType: 'application/json',
      message: 'Blogs fetched properly',
      blog,
    });
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
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async createBlog(
    @Body() body: CreateBlogDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ): Promise<ResponseBlogDto> {
    if (image) {
      body.image = image;
    }
    const userId = req.user;
    if (!userId) throw new NotFoundException('user not found');
    const blog = await this.blogService.addBlog(body, userId.sub);
    const data = blog;
    return {
      message: 'Blog created successfully',
      success: true,
      data,
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
    const editBlog = await this.blogService.editBlog(id, updateBlogDto);
    return { success: true, editBlog };
  }

  @Delete(':id')
  async deleteBlog(@Param('id', ParseIntPipe) id: number) {
    const deleteBlog = await this.blogService.deleteBlog(id);
    return { success: true, deleteBlog };
  }
}
