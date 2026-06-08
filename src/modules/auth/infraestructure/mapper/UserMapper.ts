import { Accounts as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/User';

export class UserMapper {
  static toDomain(user: PrismaUser): User {
    return User.reconstitute({
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
