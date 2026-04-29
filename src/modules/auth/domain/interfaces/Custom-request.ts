export interface CustomRequest extends Request {
  cookies: {
    access_token?: string;
    refresh_token?: string;
  };
}

export interface RequestWithUser extends Request {
  user: { email: string; role: string };
}
