import axios from "axios";
import authHeader from "@/helpers/auth-headers";

export default function useUser(userData: any) {
  const data = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    roles: userData.roles,
  };

  return axios.post("http://localhost:44312/api/user", data, {
    headers: authHeader(),
  });
}
