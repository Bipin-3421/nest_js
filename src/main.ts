import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appSetting } from './config/appSetting';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Blackticles')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = appSetting.port || 4000;
  await app.listen(port, () =>
    console.log(`The server is working on port:${port}`),
  );
}
bootstrap();
