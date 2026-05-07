import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/User-repository';

import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/User';
import { CreateUserCompanyInputPort } from '../../domain/interfaces/User-company.interface';

@Injectable()
export class UsersCompanyUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
  ) {}

  async register(userPort: CreateUserCompanyInputPort): Promise<User> {
    try {
      const existingUser = await this.userRepo.userByEmail(userPort.email);

      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }
      //la cantida de hasheos se para por variables de entorno
      const hashedPassword = await bcrypt.hash(userPort.password, 10);

      const newUser = User.createCompany(
        userPort.email,
        hashedPassword,
        userPort.companyName,
        userPort.rif,
        userPort.phone,
        userPort.address,
        userPort.description,
        userPort.website,
        userPort.size,
        userPort.sector,
        userPort.logoUrl,
      );

      const saveUser = await this.userRepo.saveUserCompany(newUser);

      return saveUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }
}
