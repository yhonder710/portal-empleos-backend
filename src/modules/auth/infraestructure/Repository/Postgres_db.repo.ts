import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/User-repository';
import { UserMapper } from './UserMapper';

@Injectable()
export class PostgresDBRepo implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        password: data.password,
        refreshToken: data.refreshToken ?? null,
      },
    });

    return updatedUser ? UserMapper.toDomain(updatedUser) : undefined;
  }

  async userByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        individual: true,
        company: true,
      },
    });

    if (!user) return undefined;

    return UserMapper.toDomain(user);
  }

  async saveUserCompany(user: User): Promise<User> {
    const newUserDB = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,

        company: {
          create: {
            companyName: user.userCompany?.companyName,
            rif: user.userCompany?.rif,
          },
        },
      },
    });
    return UserMapper.toDomain(newUserDB);
  }

  async saveUserIndividual(user: User): Promise<User> {
    const newUserDB = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,

        individual: {
          create: {
            firstName: user.userIndividual?.firstName,
            lastName: user.userIndividual?.lastName,
          },
        },
      },
    });
    return UserMapper.toDomain(newUserDB);
  }
}
