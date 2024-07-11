import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appSetting } from './config/appSetting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = appSetting.port || 4000;
  await app.listen(port, () =>
    console.log(`The server is working on port:${port}`),
  );
}
bootstrap();
