import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [WorkersService],
  exports: [WorkersService],
})
export class WorkersModule {}
