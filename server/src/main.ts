import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // Keep API under /api but leave root "/" accessible (health / landing)
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  const allowedOrigins =
    process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()).filter(Boolean) ??
    ['http://localhost:3000', 'http://77.239.125.15:3000'];

  app.enableCors({ origin: allowedOrigins, credentials: true });
  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
