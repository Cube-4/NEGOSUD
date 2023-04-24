import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";
import useNotification from "./useNotification";

export default function useLogout() {
  const { setIsAuth, setIsAdmin } = useContext(UserContext);
  const router = useRouter();
  const {showSuccessNotification}  = useNotification();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsAuth(false);
    setIsAdmin(false);
    router.push("/");
    showSuccessNotification("Vous êtes déconnecté");
  }
  return logout;
}
