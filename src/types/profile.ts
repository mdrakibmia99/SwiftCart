// Enum for User Roles
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

type profile = {
  _id: string;
  gender: string;
};

// User Schema Definition
export interface IProfile {
  email: string;
  password: string;
  passwordChangedAt?: Date;
  name: string;
  role: UserRole;
  hasShop: boolean;
  clientInfo: {
    device: "pc" | "mobile";
    browser: string;
    ipAddress: string;
    pcName?: string;
    os?: string;
    userAgent?: string;
  };
  lastLogin: string;
  isActive: boolean;
  otpToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
  profile: profile;
}
