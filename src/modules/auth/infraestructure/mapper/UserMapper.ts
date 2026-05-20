import { Accounts as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/User';

export class UserMapper {
  static toDomain(user: PrismaUser): User {
    return new User(
      user.id,
      user.email,
      user.password,
      user.role,
      user.isVerified,
      undefined, // userIndividual (si lo traes luego con include)
      undefined, // userCompany
      user.refreshToken ?? undefined,
    );
  }
}
