import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { createApp } from './app';

export function setupOpenAPI(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Fit Track API')
    .setDescription('The Fit Track API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Write swagger json file
  writeFileSync(
    join(__dirname, '..', 'openapi.json'),
    JSON.stringify(document, null, 2),
  );

  // Serve Swagger UI
  SwaggerModule.setup('api', app, document);
}

// This function will be called when running the script directly
async function generateOpenAPI() {
  const app = await createApp();
  setupOpenAPI(app);
  await app.close();
  console.log('OpenAPI specification generated successfully!');
}

// Run the generator if this file is being executed directly
if (require.main === module) {
  generateOpenAPI().catch((error) => {
    console.error('Error generating OpenAPI specification:', error);
    process.exit(1);
  });
}
