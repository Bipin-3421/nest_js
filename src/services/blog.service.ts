import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from 'src/dto/create-blog.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from 'src/entities/blog-post.entity';
import { UpdateBlogDto } from 'src/dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
  ) {}

  async getAllBlogs(): Promise<BlogPost[]> {
    const allBlogs = await this.blogPostRepository.find();
    return allBlogs;
  }

  async addBlog(createBlogDto: CreateBlogDto): Promise<BlogPost> {
    const { title, overview, description } = createBlogDto;
    const newBlog = await this.blogPostRepository.create({
      title,
      overview,
      description,
    });
    return this.blogPostRepository.save(newBlog);
  }

  async editBlog(id: number, updateBlogDto: UpdateBlogDto): Promise<BlogPost> {
    const updateBlog = await this.blogPostRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!updateBlog) {
      throw new NotFoundException('No blog found');
    }
    const updatedBlog = {
      ...updateBlog,
      ...updateBlogDto,
    };
    return this.blogPostRepository.save(updatedBlog);
  }

  async deleteBlog() {}
}
