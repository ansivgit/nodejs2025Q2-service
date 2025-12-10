export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number; // expires in seconds
  // user: UserTokenPayload;
};

export type UserTokenPayload = {
  userId: string;
  login: string;
};
