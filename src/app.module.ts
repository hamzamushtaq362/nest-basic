import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { WorkersModule } from './workers/workers.module';
const path = require("node:path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://hamzamushtaq362:${process.env.DATABASE_PASSWORD}@cluster0.cys4ccm.mongodb.net/`,
    ),
    UsersModule,
    ProductsModule,
    AuthModule,
    WorkersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
