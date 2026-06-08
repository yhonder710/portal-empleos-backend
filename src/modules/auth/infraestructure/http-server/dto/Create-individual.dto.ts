import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateIndividualDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  @MinLength(6)
  readonly password!: string;

  @IsString()
  readonly firstName!: string;

  @IsString()
  readonly lastName!: string;

  @IsOptional()
  @IsString()
  readonly phone!: string;

  @IsOptional()
  @IsString()
  readonly address!: string;

  @IsNumber({}, { message: 'Years of experience must be a number' })
  @Min(0, { message: 'Years of experience cannot be negative' })
  @Max(50, { message: 'Years of experience cannot exceed 50' })
  readonly experience!: number;

  @IsOptional()
  @IsString()
  readonly workArea!: string;

  @IsString()
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  readonly description!: string;
}
