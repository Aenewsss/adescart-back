import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './modules/user.modules'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://alexandreoliv29:704010Sa@vinum.8t9uzyh.mongodb.net/?retryWrites=true&w=majority',
    ),
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
