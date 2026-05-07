export interface UserCompany {
  companyName: string;
  rif: string;
  phone: string;
  address: string;
  description: string;
  website?: string;
  size?: string;
  sector?: string;
  logoUrl?: string;
}

export interface CreateUserCompanyInputPort {
  companyName: string;
  email: string;
  password: string;
  rif: string;
  phone: string;
  address: string;
  description: string;
  website?: string;
  size?: string;
  sector?: string;
  logoUrl?: string;
}
