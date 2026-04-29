export interface UserCompany {
  companyName: string;
  rif: number;
}

export interface CreateUserCompanyInputPort {
  email: string;
  password: string;
  companyName: string;
  rif: number;
}
