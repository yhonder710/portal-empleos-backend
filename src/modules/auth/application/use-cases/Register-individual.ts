import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/User-repository';

import * as bcrypt from 'bcrypt';
import { CreateUserIndividualInputPort } from '../../domain/interfaces/User-individual.interface';
import { User } from '../../domain/entities/User';

@Injectable()
export class UsersIndividualUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
  ) {}

  async register(userPort: CreateUserIndividualInputPort): Promise<User> {
    try {
      const existingUser = await this.userRepo.userByEmail(userPort.email);

      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }
      //la cantida de hasheos se para por variables de entorno
      const hashedPassword = await bcrypt.hash(userPort.password, 10);

      const newUser = User.createIndividual(
        userPort.email,
        hashedPassword,
        userPort.firstName,
        userPort.lastName,
      );

      const saveUser = await this.userRepo.saveUser(newUser);

      return saveUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }
}
