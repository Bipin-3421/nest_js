import { ApiProperty } from '@nestjs/swagger';
import { BlogPost } from 'src/entities/blog/blog-post.entity';

export class CreateBlogDto {
  title: string;
  overview: string;
  description: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;
}

export class ResponseBlogDto {
  message: string;
  success: boolean;
  data: BlogPost;
}
