import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Transactions API')
    .setDescription('API documentation for the Transactions service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Write the Swagger JSON to a file
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  await app.listen(3000);
}
bootstrap();