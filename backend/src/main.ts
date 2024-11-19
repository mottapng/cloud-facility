import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { validationSchema } from './config/validation.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  validationSchema.parse(process.env);

  app.enableCors({
    origin: process.env.WS_CORS_ORIGIN,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const signals = ['SIGTERM', 'SIGINT'];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      await app.close();
      process.exit(0);
    });
  });

  await app.listen(process.env.PORT || 8080, '0.0.0.0');

  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
}

bootstrap();
