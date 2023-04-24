import { useRouter } from "next/router";
import { useAuth } from "../components/AuthContext";

export default function authProtected(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    if (!isAuthenticated) router.push("/");

    return <Component {...props} />;
  };
}
