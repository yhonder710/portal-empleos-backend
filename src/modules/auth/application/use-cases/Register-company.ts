import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/User-repository';

import { User } from '../../domain/entities/User';
import { CreateUserCompanyInputPort } from '../../domain/interfaces/User-company.interface';
import type { HashService } from '../../domain/interfaces/hash-service.interface';

@Injectable()
export class UsersCompanyUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    @Inject('HASH_SERVICE')
    private readonly hashService: HashService,
  ) {}

  async register(userPort: CreateUserCompanyInputPort): Promise<User> {
    try {
      const existingUser = await this.userRepo.userByEmail(userPort.email);

      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }
      const hashedPassword = await this.hashService.hash(userPort.password);

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
