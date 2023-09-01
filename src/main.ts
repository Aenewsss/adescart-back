import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: '*',
    allowedHeaders: '*',
    methods: "*",
    credentials: true
  };
  app.enableCors(options);
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
