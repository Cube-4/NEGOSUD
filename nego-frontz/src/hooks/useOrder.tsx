import axios from "axios";
import authHeader from "@/helpers/auth-headers";

export default function useUser(userData: any) {
  const data = {
    orderName: userData.orderName,
    orderDate: userData.orderDate,
    orderType: userData.orderType,
    referenceName: userData.referenceName,
    userId: userData.userId,
  };

  return axios.post("http://localhost:44312/api/order", data, {
    headers: authHeader(),
  });
}
