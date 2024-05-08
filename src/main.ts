import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const options = new DocumentBuilder()
    .setTitle('Hex-Sec API')
    .setDescription('Hex-Api description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', null, document);
}
bootstrap();
