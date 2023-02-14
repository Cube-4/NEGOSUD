import React, { useEffect } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = React.useState(false);
  let token;
  useEffect(() => {
    token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return { isAuth, setIsAuth };
}
