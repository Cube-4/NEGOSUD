import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";
import authHeader from "@/helpers/auth-headers"

export default function useLogin() {
  const router = useRouter();

  interface OrderData {
    orderName: string;
    referenceName: string;
    quantity: number;
  }
  async function order({ orderName, referenceName, quantity }: OrderData) {
    const data = {
      orderName: orderName,
      referenceName: referenceName,
      quantity: quantity,
    };
    console.log(data);
    try {

      const response = await axios.post(
        "http://localhost:44312/api/order",
        data,
       {
        headers: authHeader()
       }
      );
      console.log(response);
    } catch (error: any) {
      alert(error);
    }
  }
  return useMutation(order);
}
