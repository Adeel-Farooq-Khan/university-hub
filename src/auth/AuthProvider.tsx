import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "teacher" | "student";

export interface AuthUser {
  id: string;
  role: Role;
  loginId?: string;
  fullName: string;
  roleTitle?: string;
  department?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isBootstrapping: boolean;
  login: (params: { role: Role; loginId: string; password: string }) => Promise<AuthUser>;
  logout: () => void;
}

const TOKEN_KEY = "uniboard_token";

const AuthContext = createContext<AuthContextValue | null>(null);

function getApiBase() {
  return (import.meta.env.VITE_API_BASE_URL as string | undefined) || "/api";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        if (!token) {
          if (!cancelled) setUser(null);
          return;
        }
        const res = await fetch(`${getApiBase()}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("unauthorized");
        const data = (await res.json()) as { user: AuthUser };
        if (!cancelled) setUser(data.user);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        if (!cancelled) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsBootstrapping(false);
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isBootstrapping,
      login: async ({ role, loginId, password }) => {
        const body =
          role === "teacher"
            ? { role, teacherId: loginId, password }
            : { role, studentId: loginId, password };

        const res = await fetch(`${getApiBase()}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = (await res.json()) as
          | { token: string; user: AuthUser }
          | { error: string };

        if (!res.ok) {
          throw new Error("error" in data ? data.error : "Login failed");
        }

        localStorage.setItem(TOKEN_KEY, (data as { token: string }).token);
        setToken((data as { token: string }).token);
        setUser((data as { user: AuthUser }).user);
        return (data as { user: AuthUser }).user;
      },
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      },
    }),
    [isBootstrapping, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}


