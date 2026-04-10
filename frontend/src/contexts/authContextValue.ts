import { createContext } from "react";
import type { User } from "../types";

export type AuthContextType = {
  userData: User | null;
  updateUser: (data: User) => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
