import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// fastify option (faster)
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// fastify option (faster)
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen({
    host: '0.0.0.0',
    port: 3000,
  });
}

// // express option (default):
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }

bootstrap();
