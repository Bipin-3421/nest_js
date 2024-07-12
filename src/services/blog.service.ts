import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from 'src/dto/create-blog.dto';

@Injectable()
export class BlogService {
  getAllBlogs(): string[] {
    return ['BlogPost1', 'BlogPost2', 'BlogPost3'];
  }

  addBlog(createBlogDto: CreateBlogDto): string[] {
    const { title, overview, description } = createBlogDto;
    const blog = [title, overview, description];
    return blog;
  }
}
