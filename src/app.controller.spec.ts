import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';

describe('AppController', () => {
  let appController: BlogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService],
    }).compile();

    appController = app.get<BlogController>(BlogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAllBlogs()).toBe('Hello World!');
    });
  });
});
