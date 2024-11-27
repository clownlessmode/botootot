import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // ENV VARIABLES
  const PORT = configService.getOrThrow('PORT');
  const APP_URL = configService.getOrThrow('APP_URL');

  // APP
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:5173', 'http://**:**'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    })
  );

  // SWAGGER CONFIGURATION

  // LOGGER
  const logger = new Logger('Bootstrap');

  // SERVER LISTEN
  await app.listen(PORT);

  logger.log(`----------------------------------------------------------`);
  logger.log(`🚀 Server started successfully on port ${PORT}`);
  logger.log(`🔗 Swagger UI is available at ${APP_URL}:${PORT}/api/docs`);
  logger.log(`🗂️ Application base URL is ${APP_URL}:${PORT}`);
  logger.log(`🔧 Environment: ${process.env.NODE_ENV}`);
  logger.log(`----------------------------------------------------------`);
}

bootstrap();
