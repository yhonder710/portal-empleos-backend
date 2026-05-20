import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/User-repository';
import { UserMapper } from '../mapper/UserMapper';

@Injectable()
export class PostgresDBRepo implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const updatedUser = await this.prisma.accounts.update({
      where: { id },
      data: {
        email: data.email,
        password: data.password,
        refreshToken: data.refreshToken ?? null,
        isVerified: data.isVerified,
      },
    });

    return updatedUser ? UserMapper.toDomain(updatedUser) : undefined;
  }

  async userByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.accounts.findUnique({
      where: { email },
      include: {
        users: true,
        companys: true,
      },
    });

    if (!user) return undefined;

    return UserMapper.toDomain(user);
  }

  async saveUserCompany(user: User): Promise<User> {
    const newUserDB = await this.prisma.accounts.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,

        companys: {
          create: {
            companyName: user.userCompany?.companyName,
            rif: user.userCompany?.rif,
            phone: user.userCompany?.phone,
            address: user.userCompany?.address,
            description: user.userCompany?.description,
            website: user.userCompany?.website,
            sector: user.userCompany?.sector,
            size: user.userCompany?.size,
            logoUrl: user.userCompany?.logoUrl,
          },
        },
      },
    });
    return UserMapper.toDomain(newUserDB);
  }

  async saveUserIndividual(user: User): Promise<User> {
    const newUserDB = await this.prisma.accounts.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,

        users: {
          create: {
            firstName: user.userIndividual?.firstName,
            lastName: user.userIndividual?.lastName,
            phone: user.userIndividual?.phone,
            address: user.userIndividual?.address,
            experience: user.userIndividual?.experience,
            workArea: user.userIndividual?.workArea,
            description: user.userIndividual?.description,
          },
        },
      },
    });
    return UserMapper.toDomain(newUserDB);
  }
}
