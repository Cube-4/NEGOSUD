import axios from "axios";
import authHeader from "@/helpers/auth-headers";

interface userData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
}

export default function useUser(userData: userData) {
  const rolesList = [];
  rolesList.push(userData.role);
  console.log(rolesList);

  const data = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    role: rolesList,
  };

  return axios.post("http://localhost:44312/api/user", data, {
    headers: authHeader(),
  });
}
