import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyCodeDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  @Length(6, 6)
  readonly code!: string;
}
