import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";

export default function useLogout() {
  const { setIsAuth, setIsAdmin } = useContext(UserContext);
  const router = useRouter();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsAuth(false);
    setIsAdmin(false);
    router.push("/");
  }
  return logout;
}
