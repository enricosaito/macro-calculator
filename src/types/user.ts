// src/types/user.ts

export type UserRole = "user" | "premium" | "contributor" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  isPremiumUser: boolean;
  createdAt: Date;
  lastLogin: Date;
  // Additional user fields as needed
}
