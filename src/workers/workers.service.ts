import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';

// This should be a real class/interface representing a user entity
export type Worker = any;

@Injectable()
export class WorkersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
//   private readonly users = [
//     {
//       userId: 1,
//       username: 'john',
//       password: 'changeme',
//     },
//     {
//       userId: 2,
//       username: 'maria',
//       password: 'guess',
//     },
//   ];

//   async findOne(username: string): Promise<Worker | undefined> {
//     return this.users.find(user => user.username === username);
//   }

async findOne(username: string): Promise<Worker | undefined> {
    return await this.userModel.find({name: username});
  }
}