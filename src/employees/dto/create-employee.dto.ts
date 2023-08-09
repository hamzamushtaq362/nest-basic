import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @MinLength(0)
  password: string;

  role: string;
}
