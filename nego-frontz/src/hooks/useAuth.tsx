import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  let token;
  useEffect(() => {
    token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return { isAuth, setIsAuth };
}
