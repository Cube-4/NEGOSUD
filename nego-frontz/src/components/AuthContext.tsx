import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isAdmin: boolean;
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

  const [roles] = useState<number[]>(
    (localStorage && JSON.parse(localStorage.getItem("roles") || "[]")) || []
  );

  const [isAdmin] = useState(roles.length > 0 && roles.includes(1));

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
      value={{ isAuthenticated, setIsAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
