import { useRouter } from "next/router";

export default function authProtected(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const isAdmin = localStorage.getItem("isAdmin");
    const router = useRouter();

    if (!isAuthenticated) router.push("/");

    return <Component {...props} />;
  };
}
