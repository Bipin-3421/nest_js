import { Module } from '@nestjs/common';
import { BlogModule } from './modules/blog.module';

@Module({
  imports: [BlogModule],
})
export class AppModule {}
