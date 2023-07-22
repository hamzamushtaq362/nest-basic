import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEnum(["junior","senior"], {message: "type must be either junior or senior"})
  type: "junior" | "senior"
}
