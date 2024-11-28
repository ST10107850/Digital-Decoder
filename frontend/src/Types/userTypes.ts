// Define the UserInfo type
export type UserInfo = {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
  phoneNumber: number;
  email: string;
  status: string;
};

// Define AuthState interface
export interface AuthState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
}

// Define the structure of the root state
export interface RootState {
  auth: AuthState;
}

export type Blog = {
  _id: string;
  images: string;
  title: string;
  description: string;
};

