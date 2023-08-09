import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  password: string;
}
