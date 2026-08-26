import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Enable CORS for mobile app & local dev
  app.enableCors();

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);

  logger.log(`Local Task Marketplace API is running on: http://localhost:${port}`);
  logger.log(`Health check available at: http://localhost:${port}/health`);
}

bootstrap();
