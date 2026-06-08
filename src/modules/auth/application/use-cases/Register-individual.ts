import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import type { UserRepository } from '../../domain/repositories/User-repository';

import { CreateUserIndividualInputPort } from '../../domain/interfaces/User-individual.interface';
import { User } from '../../domain/entities/User';
import type { HashService } from '../../domain/interfaces/hash-service.interface';

@Injectable()
export class UsersIndividualUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    @Inject('HASH_SERVICE')
    private readonly hashService: HashService,
  ) {}

  async register(userPort: CreateUserIndividualInputPort): Promise<User> {
    try {
      const existingUser = await this.userRepo.userByEmail(userPort.email);

      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }
      const hashedPassword = await this.hashService.hash(userPort.password);

      const newUser = User.createIndividual(
        userPort.email,
        hashedPassword,
        userPort.firstName,
        userPort.lastName,
        userPort.phone,
        userPort.address,
        userPort.experience,
        userPort.workArea,
        userPort.description,
      );

      const saveUser = await this.userRepo.saveUserIndividual(newUser);

      return saveUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }
}
