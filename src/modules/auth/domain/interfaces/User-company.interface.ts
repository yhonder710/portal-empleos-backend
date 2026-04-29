export interface UserCompany {
  companyName: string;
  rif: string;
}

export interface CreateUserCompanyInputPort {
  email: string;
  password: string;
  companyName: string;
  rif: string;
}
