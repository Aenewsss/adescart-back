import {  Module } from '@nestjs/common';
import { ProductModule } from './modules/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.modules'
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    ProductModule,
    UserModule,
  ],
})
export class AppModule {}
