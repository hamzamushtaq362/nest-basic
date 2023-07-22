import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  private users = [
    { id: 0, name: 'UserA', type: 'junior' },
    { id: 1, name: 'UserB', type: 'senior' },
  ];

  getUsers(type?: 'junior' | 'senior') {
    console.log(this.users);
    if (type) {
      return this.users.filter((user) => user.type === type);
    }
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return 'not found';
    }
    return user;
  }

  // createUser(createUserDto: CreateUserDto) {
  //   const newUser = { ...createUserDto, id: Math.random() * 10000 };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  createUser(createUserDto: CreateUserDto) {
    const newUser = { ...createUserDto, id: Math.random() * 10000 };
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.getUser(id);
  }

  removeUser(id: number) { 
    const toBeRemoved = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return {message: "Removed", detail: toBeRemoved};
  }
}
