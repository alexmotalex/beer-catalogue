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

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: UserData) => Promise<void>;
  register: (data: UserData) => Promise<void>;
  logout: () => void;
};
