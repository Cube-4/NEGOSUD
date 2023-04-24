import { useRouter } from "next/router";
import useNotification from "./useNotification";

export default function useLogout() {
  const { setIsAuthenticated, setIsAdmin } = useAuth();
  const router = useRouter();
  const { showSuccessNotification } = useNotification();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("id");
    setIsAuthenticated(false);
    setIsAdmin(false);

    router.push("/");
    showSuccessNotification("Vous êtes déconnecté");
  }

  return logout;
}
