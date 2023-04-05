import { useMutation } from "react-query";
import axios from "axios";
import authHeader from "@/helpers/auth-headers";

export default function useArticle() {
  interface articleData {
    name: string;
    reference: string;
    origin: string;
    stock: string;
    price: string;
    id: string;
  }
  async function article({
    name,
    reference,
    origin,
    stock,
    price,
    id,
  }: articleData) {
    const data = {
      name: name,
      reference: reference,
      origin: origin,
      stock: stock,
      price: price,
      userId: id,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:44312/api/article",
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
  return useMutation(article);
}
