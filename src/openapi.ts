import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

export function setupOpenAPI(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Fit Track API')
    .setDescription('The Fit Track API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Write the Swagger JSON file
  writeFileSync(
    join(__dirname, '..', 'openapi.json'),
    JSON.stringify(document, null, 2),
  );

  // Serve Swagger UI at /api
  SwaggerModule.setup('api', app, document);
}
