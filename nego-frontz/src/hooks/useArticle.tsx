import axios from "axios";
import authHeader from "@/helpers/auth-headers";
interface articleData {
  name: string;
  reference: string;
  origin: string;
  stock: string;
  price: string;
  id: string;
}
export default function useArticle({
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

  axios.post("http://localhost:44312/api/article", data, {
    headers: authHeader(),
  });
}
