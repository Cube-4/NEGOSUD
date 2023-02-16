import React, { useEffect } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = React.useState(false);
  let loggedUser;
  let token = "";
  useEffect(() => {
    loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser !== null ) {
      token = JSON.parse(loggedUser).token
    }
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return { isAuth, setIsAuth };
}
