import axios from "axios";
import useNotification from "@/hooks/useNotification";

interface LoginData {
  email: string;
  password: string;
}
export default async function useLogin({ email, password }: LoginData) {
  const { showErrorNotification, showSuccessNotification } = useNotification();

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
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("roles", JSON.stringify(response.data.result.roles));
      localStorage.setItem(
        "isAdmin",
        JSON.stringify(response.data.result.roles.includes(1))
      );
      localStorage.setItem("id", response.data.result.id);
    }
  } catch (error: any) {
    showErrorNotification("Veuillez vérifier votre email et mot de passe.");

    if (error.response && error.response.status === 401) {
      throw new Error("Unauthorized");
    } else {
      throw error;
    }
  }
}
