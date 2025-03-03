import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // Apply validation globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
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
  
  // app.setGlobalPrefix('api'); // This would make all routes start with /api
  
  // Update the Swagger document to reflect the global prefix
  // SwaggerModule.setup('api-docs', app, document, {
  //   swaggerOptions: {
  //     url: '/api-docs-json', // Ensure the JSON endpoint is prefixed
  //     persistAuthorization: true,
  //   },
  //   customSiteTitle: 'API Documentation',
  // });
  
  await app.listen(3000);
}
bootstrap();
