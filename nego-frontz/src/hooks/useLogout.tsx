import { useRouter } from "next/router";
import useNotification from "./useNotification";

export default function useLogout() {
  const router = useRouter();
  const { showSuccessNotification } = useNotification();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");

    router.push("/");
    showSuccessNotification("Vous êtes déconnecté");
  }

  return logout;
}
