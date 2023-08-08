import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @MinLength(0)
  quantity: string

  category: string
}
