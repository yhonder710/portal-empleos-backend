import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  companyName!: string;

  @IsNumber()
  rif!: number;
}
