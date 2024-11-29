
export type UserInfo = {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
  phoneNumber: number;
  createdAt: Date;
  role: string;
  email: string;
  status: string;
};
export interface AuthState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
}
export interface RootState {
  auth: AuthState;
}
export type Blog = {
  _id: string;
  subcategory: string;
  images: string;
  title: string;
  desciption: string;
  createdAt: Date;
};

