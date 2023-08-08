import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WorkersService } from 'src/workers/workers.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: WorkersService,
    private jwtService: JwtService
  ) {}

  async signIn(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(name);
    console.log("user",user);

    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const { password, ...result } = user;
    // return result;

    // TODO: Generate a JWT and return it here
    // instead of the user object
    if (user[0]?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user[0]._id, username: user[0].name };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }
}
