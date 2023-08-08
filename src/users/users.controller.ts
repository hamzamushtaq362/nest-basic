import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AdminGuard } from 'src/admin/admin.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/decorators/role.enum';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

  // Get
//   @Get()
//   getUsers() {
//     return ['P1', 'P2'];
//   }

  //   @Get()
  //   getUsers(@Query("type") type: "string") {
  //     return ['P1', 'P2', {type}];
  //   }

  // @Get()
  // getUsers(@Query("type") type: 'junior' | 'senior') {
  //   return this.userService.getUsers(type);
  // }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // getSingleUser(@Param('id') id: string) {
  //   try{
  //     return this.userService.getUser(+id);
  //   } catch(err){
  //     throw new NotFoundException();
  //   }
  // }

  // @Get(':id')
  // getSingleUser(@Param('id', ParseIntPipe) id: number) {
  //   try{
  //     return this.userService.getUser(id);
  //   } catch(err){
  //     throw new NotFoundException();
  //   }
  // }

  @Get(':id')
  getSingleUser(@Param('id') id: string) {
    try{
      return this.userService.getUserM(id);
    } catch(err){
      throw new NotFoundException();
    }
  }

  // Post
  @Post()
  @Roles(Role.Admin)
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Put
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  // Delete
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

}
