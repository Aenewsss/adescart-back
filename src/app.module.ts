import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.modules'
import { ConfigModule } from '@nestjs/config';
import { MongoMemoryServer } from "mongodb-memory-server";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    UserModule,
  ],
})
export class AppModule { }
