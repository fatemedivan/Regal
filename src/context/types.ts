export type UserInfo = {
  phoneNumber: string;
  name: string;
  family: string;
  email: string;
};

export type AuthContextType = UserInfo & {
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  refreshUser: () => Promise<void>;
  logout: () => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
