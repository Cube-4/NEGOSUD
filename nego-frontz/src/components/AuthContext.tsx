import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isAdmin: boolean;
  roles: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
}

export function AuthProvider({ children }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof localStorage !== "undefined" &&
      localStorage.getItem("token") !== null
  );

  const [roles] = useState<number>(
    (localStorage && JSON.parse(localStorage.getItem("roles") || "[]")) || []
  );

  const [isAdmin] = useState<boolean>(roles === 1);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const handleStorageChange = () => {
        if (!localStorage.getItem("token")) {
          setIsAuthenticated(false);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, roles, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
