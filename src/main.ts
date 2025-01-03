import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

// Load the appropriate env file
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.local.env';
config({ path: envFile });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
