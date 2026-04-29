import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(6, { message: 'El nombre debe tener al menos 3 caracteres' })
  password!: string;
}
