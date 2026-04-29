import { User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/User';
import { Role } from '../../domain/interfaces/User.interface';

export class UserMapper {
  static toDomain(user: PrismaUser): User {
    return new User(
      user.id,
      user.email,
      user.password,
      Role.COMPANY,
      undefined, // userIndividual (si lo traes luego con include)
      undefined, // userCompany
      user.refreshToken ?? undefined,
    );
  }
}
