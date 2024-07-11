import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  getAllBlogs(): string[] {
    return ['BlogPost1', 'BlogPost2', 'BlogPost3'];
  }
}
