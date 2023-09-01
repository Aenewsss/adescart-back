import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.modules'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ProductModule,
    UserModule,
  ],
})
export class AppModule { }
