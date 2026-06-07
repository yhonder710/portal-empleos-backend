import { UserCompany } from '../interfaces/User-company.interface';
import { UserIndividual } from '../interfaces/User-individual.interface';

import { Role } from '@prisma/client';
export { Role };

import { v4 as uuidv4 } from 'uuid';

export class User {
  private constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: Role,
    public isVerified: boolean,
    //campos por roles
    public userIndividual?: UserIndividual,
    public userCompany?: UserCompany,
    public refreshToken?: string,
  ) {}

  static createIndividual(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    experience: number,
    workArea: string,
    description: string,
  ): User {
    if (!firstName || !lastName) {
      throw new Error('Individual requires first & last name');
    }

    return new User(uuidv4(), email, password, Role.USER, false, {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address,
      experience: experience,
      workArea: workArea,
      description: description,
    });
  }

  static createCompany(
    email: string,
    password: string,
    companyName: string,
    rif: string,
    phone: string,
    address: string,
    description: string,
    website?: string,
    size?: string,
    sector?: string,
    logoUrl?: string,
  ): User {
    if (!companyName || !rif) {
      throw new Error('Company requires name and tax ID');
    }
    return new User(uuidv4(), email, password, Role.COMPANY, false, undefined, {
      companyName: companyName,
      rif: rif,
      phone: phone,
      address: address,
      description: description,
      website: website,
      size: size,
      sector: sector,
      logoUrl: logoUrl,
    });
  }

  static reconstitute_mapper(data: {
    id: string;
    email: string;
    password: string;
    role: Role;
    isVerified: boolean;
    userIndividual?: UserIndividual;
    userCompany?: UserCompany;
    refreshToken?: string;
  }): User {
    return new User(
      data.id,
      data.email,
      data.password,
      data.role,
      data.isVerified,
      data.userIndividual,
      data.userCompany,
      data.refreshToken,
    );
  }
}
