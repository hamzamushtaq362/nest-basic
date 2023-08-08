import { Controller, HttpCode, HttpStatus, Post, Body, Get, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { CreateAuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  //   @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    try{
    return this.authService.signIn(signInDto.name, signInDto.password);
  }catch(err){
    throw new BadRequestException();
  }
  }

    @Get()
    getAuth() {
    return ['P1', 'P2'];
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
}
