import { config } from 'dotenv';

// Load the appropriate env file
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.local.env';
config({ path: envFile });

import { createApp } from './app';
import { setupOpenAPI } from './openapi';

async function bootstrap() {
  const app = await createApp();
  setupOpenAPI(app);
  await app.listen(3000);
}

bootstrap();
