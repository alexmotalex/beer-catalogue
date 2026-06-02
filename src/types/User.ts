export type User = {
  id: number;
  email: string;
  is_active: boolean;
  activation_token: 'string';
};

export type UserData = {
  email: string;
  password: string;
};
