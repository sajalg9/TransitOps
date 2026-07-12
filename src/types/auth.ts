import type { Profile } from "./database";

export interface AuthState {
  session: any | null;
  profile: Profile | null;
  loading: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
  role: string;
}