import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SP_DEFAULT } from './common/constanst/config-globals';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from './common/utils/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  const logger = new Logger('Main');
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  setupSwagger(app, 'api', 'ADMINISTRACION DE PROYECTOS');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get<number>(SP_DEFAULT) || 3000;
  await app.listen(port);

  logger.log(`Server is running port ${port}`);
}
bootstrap();
