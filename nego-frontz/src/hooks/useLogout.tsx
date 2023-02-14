import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";

export default function useLogout() {
  const { setIsAuth } = useContext(UserContext);
  const router = useRouter();
  function logout() {
    localStorage.removeItem("token");
    setIsAuth(false);
    router.push("/");
  }
  return logout;
}
