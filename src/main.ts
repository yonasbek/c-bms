import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable static file serving from uploads directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  
  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // Apply validation globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.setGlobalPrefix('api'); // This would make all routes start with /api

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the backend services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // Add custom CSS to improve the styling (optional)
  const customOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Documentation',
  };
  
  SwaggerModule.setup('api-docs', app, document, customOptions);
  
  
  // Update the Swagger document to reflect the global prefix
  // SwaggerModule.setup('api-docs', app, document, {
  //   swaggerOptions: {
  //     url: '/api-docs-json', // Ensure the JSON endpoint is prefixed
  //     persistAuthorization: true,
  //   },
  //   customSiteTitle: 'API Documentation',
  // });
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
