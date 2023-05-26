import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Configurar CORS
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
