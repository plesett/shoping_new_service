import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('前台接口')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // 处理跨域
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe()) //开启一个全局验证管道

  await app.listen(3000);
  console.log('http://127.0.0.1:3000')
}
bootstrap();
