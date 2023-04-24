import { useContext } from "react";
import { useRouter } from "next/router";

export default function useLogout() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");

    router.push("/");
  }

  return logout;
}
