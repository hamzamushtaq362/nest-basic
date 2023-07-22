import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://hamzamushtaq362:hamza12345@cluster0.cys4ccm.mongodb.net/'), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
