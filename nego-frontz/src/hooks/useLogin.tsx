import { useRouter } from "next/router";
import { useContext } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import useNotification  from "@/hooks/useNotification";
import { showNotification } from "@mantine/notifications";

export default function useLogin() {
  const { setIsAuth, setIsAdmin } = useContext(UserContext);
  const router = useRouter();
  const { showErrorNotification, showSuccessNotification } = useNotification();


  interface LoginData {
    email: string;
    password: string;
  }
  async function login({ email, password }: LoginData) {
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:44312/api/user/authenticate",
        data
      );

      if (response.status == 200) {
        showSuccessNotification("Vous êtes connecté !");
        localStorage.setItem("token", JSON.stringify(response.data.result.token));
        if (response.data.result.roles[0] === 1) {
          localStorage.setItem("isAdmin", "true");
          setIsAdmin(true);
        } else {
          localStorage.setItem("isAdmin", "false");
          setIsAdmin(false);
        }
        localStorage.setItem("userMail", response.data.result.email);
        localStorage.setItem("userId", response.data.result.id);
        setIsAuth(true);
        router.push("/stocks");
      }
    } catch (error: any) {
      showErrorNotification("Veuillez vérifier votre email et mot de passe.")

      if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw error;
      }
    }
  }
  return useMutation(login);
}
