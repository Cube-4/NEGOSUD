import { useContext } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/AuthContext";

export default function useLogout() {
  const { setIsAuthenticated, setIsAdmin } = useAuth();
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("id");
    setIsAuthenticated(false);
    setIsAdmin(false);

    router.push("/");
  }

  return logout;
}
