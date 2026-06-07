import { Accounts as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/User';

//ver si funciona el nuevo metodo de user

export class UserMapper {
  static toDomain(user: PrismaUser): User {
    return User.reconstitute_mapper({
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      isVerified: user.isVerified,
      refreshToken: user.refreshToken ?? undefined,
      userIndividual: undefined,
      userCompany: undefined,
    });
  }
}
