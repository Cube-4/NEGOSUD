import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import useAuth from "@/hooks/useAuth";
export function authProtected(Comp) {
  return function AuthProtected(props) {
    const Context = useContext(UserContext);
    const router = useRouter();
    if (Context.isAuth === false && typeof window !== "undefined") {
      router.push("/");
      return null;
    }
    return <Comp {...props} />;
  };
}
