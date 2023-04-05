import { useMutation } from "react-query";
import axios from "axios";
import authHeader from "@/helpers/auth-headers";

export default function useUser() {
  interface userData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }
  async function user({ firstName, lastName, email, password }: userData) {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:44312/api/user",
        data,
        {
          headers: authHeader(),
        }
      );
      console.log("Hello IS " + response.data);
    } catch (error: any) {
      alert(error);
    }
  }
  return useMutation(user);
}
