import { useRouter } from "next/router";
import { useContext } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { UserContext } from "@/context/UserContext";

export default function useLogin() {
  const { setIsAuth } = useContext(UserContext);
  const router = useRouter();

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
      localStorage.setItem("token", response.data.result.token);
      setIsAuth(true);
      router.push("/stocks");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw error;
      }
    }
  }
  return useMutation(login);
}
