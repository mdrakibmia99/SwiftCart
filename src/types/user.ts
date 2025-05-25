export interface IUser {
  userId: string;
  name: string;
  email: string;
  profilePhoto?: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: 'user' | 'admin';
  iat?: number;
  exp?: number;
}
