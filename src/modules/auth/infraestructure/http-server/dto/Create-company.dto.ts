import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsUrl,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateCompanyDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  readonly email!: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  readonly password!: string;

  @IsString({ message: 'El nombre de la empresa es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  readonly companyName!: string;

  @IsString({ message: 'El RIF es requerido' })
  @Matches(/^[JVE]-\d{7,9}$/, {
    message: 'Formato de RIF inválido (ejemplo: J-12345678)',
  })
  readonly rif!: string;

  @IsString({ message: 'El teléfono es requerido' })
  @MinLength(8, { message: 'El teléfono debe tener al menos 8 dígitos' })
  readonly phone!: string;

  @IsString({ message: 'La dirección es requerida' })
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  readonly address!: string;

  @IsString({ message: 'La descripción es requerida' })
  @MinLength(20, {
    message: 'La descripción debe tener al menos 20 caracteres',
  })
  @MaxLength(1000, {
    message: 'La descripción no puede superar los 1000 caracteres',
  })
  readonly description!: string;

  @IsOptional()
  @IsUrl(
    {},
    { message: 'El sitio web debe ser una URL válida (https://ejemplo.com)' },
  )
  readonly website?: string;

  @IsOptional()
  @IsUrl({}, { message: 'El logo URL debe ser una URL válida (https://...)' })
  @IsString({ message: 'El logo URL debe ser texto' })
  readonly logoUrl?: string;

  @IsOptional()
  @IsString({ message: 'El tamaño debe ser texto' })
  readonly size!: string;

  @IsOptional()
  @IsString({ message: 'El sector debe ser texto' })
  readonly sector!: string;
}
