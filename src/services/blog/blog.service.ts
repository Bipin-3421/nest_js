import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from 'src/dto/blog/create-blog.dto';
import { UpdateBlogDto } from 'src/dto/blog/update-blog.dto';
import { BlogPost } from 'src/entities/blog/blog-post.entity';

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

  async addBlog(
    createBlogDto: CreateBlogDto,
    image: Express.Multer.File,
  ): Promise<BlogPost> {
    const { title, overview, description } = createBlogDto;
    const newBlog = this.blogPostRepository.create({
      title,
      overview,
      description,
      image: image.path,
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

  async deleteBlog(id: number): Promise<DeleteResult> {
    const deletedBlog = await this.blogPostRepository.delete(id);
    if (deletedBlog.affected === 0) {
      throw new NotFoundException('No blog found');
    }
    return deletedBlog;
  }
}
