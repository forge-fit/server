import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Import your OpenAPI generation logic
import { setupOpenAPI } from './openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Check if the script is run with a specific argument or environment variable
  if (process.env.GENERATE_OPENAPI === 'true') {
    setupOpenAPI(app);
    process.exit(0); // Exit after generating the spec
  }

  await app.listen(3000);
}

bootstrap();
