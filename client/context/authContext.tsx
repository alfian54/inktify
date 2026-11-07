"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api, getToken, TOKEN_KEY } from "@/lib/api";

type User = { id: string; username: string; email: string };
type AuthResponse = { token: string; user: User };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On first load: if a token is stored, ask the backend who it belongs to
  useEffect(() => {
    const restore = getToken()
      ? api<User>("/auth/me")
          .then(setUser)
          .catch(() => localStorage.removeItem(TOKEN_KEY)) // invalid/expired token
      : Promise.resolve();

    restore.finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
  };

  const signup = async (username: string, email: string, password: string) => {
    const data = await api<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
