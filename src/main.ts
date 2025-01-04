import { createApp } from './app';

async function bootstrap() {
  const app = await createApp();

  if (process.env.GENERATE_OPENAPI === 'true') {
    console.log('Generating OpenAPI specification...');
    const { setupOpenAPI } = await import('./openapi');
    setupOpenAPI(app);
    process.exit(0);
  }

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
