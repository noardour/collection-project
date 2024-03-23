export type UserRole = "USER" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  lastLoggedIn: Date;
}
