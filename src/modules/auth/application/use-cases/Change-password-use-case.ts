// src/modules/auth/application/use-cases/Change-password-use-case.ts
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/User-repository';
import type { HashService } from '../../domain/interfaces/hash-service.interface';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,

    @Inject('HASH_SERVICE')
    private readonly hashService: HashService,
  ) {}

  async execute(email: string, plainNewPassword: string): Promise<void> {
    const user = await this.userRepo.userByEmail(email);

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    try {
      await user.changePassword(plainNewPassword, this.hashService);

      await this.userRepo.saveUpdateUser(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('Ocurrió un error inesperado');
    }
  }
}
