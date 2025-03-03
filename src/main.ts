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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This is a key to be used in the @ApiBearerAuth() decorator
    )
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
  
  app.setGlobalPrefix('api'); // This would make all routes start with /api
  
  await app.listen(3000);
}
bootstrap();
