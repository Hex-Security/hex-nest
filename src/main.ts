import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  configDotenv();

  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
  .setTitle('Hex-Sec API')
  .setDescription('Hex-Api description')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(process.env.PORT || 15434);
}

bootstrap();
