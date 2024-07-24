import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBlogDto } from 'src/dto/blog/update-blog.dto';
import { CreateBlogDto } from 'src/dto/blog/create-blog.dto';
import { BlogPost } from 'src/entities/blog/blog-post.entity';
import { Between } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
  ) {}

  async filter(startDate: string, endDate: string): Promise<BlogPost[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      throw new Error('End date must be after start date');
    }

    start.setHours(0, 0, 0);
    end.setHours(23, 59, 59);

    return this.blogPostRepository.find({
      where: {
        createdAt: Between(start, end),
      },
      order: { createdAt: 'ASC' },
    });
  }

  async getAllBlog(): Promise<BlogPost[]> {
    const allBlog = await this.blogPostRepository.find();
    if (allBlog.length === 0) {
      throw new NotFoundException('no blog found');
    }
    return allBlog;
  }

  async addBlog(data: CreateBlogDto, userId: string): Promise<BlogPost> {
    const newBlog = this.blogPostRepository.create({
      title: data.title,
      overview: data.overview,
      description: data.description,
      image: data.image.path,
      userId,
    });

    return this.blogPostRepository.save(newBlog);
  }

  async editBlog(id: number, data: UpdateBlogDto): Promise<BlogPost> {
    const existingBlog = await this.blogPostRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!existingBlog) {
      throw new NotFoundException('no blog found');
    }

    if (data.title) existingBlog.title = data.title;
    if (data.description) existingBlog.description = data.description;
    if (data.overview) existingBlog.overview = data.overview;

    return this.blogPostRepository.save(existingBlog);
  }

  async deleteBlog(id: number): Promise<DeleteResult> {
    const deletedBlog = await this.blogPostRepository.delete(id);
    if (deletedBlog.affected === 0) {
      throw new NotFoundException('No blog found');
    }
    return deletedBlog;
  }
}
