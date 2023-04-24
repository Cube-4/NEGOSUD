import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function authProtectedLogin(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    const router = useRouter();

    if (isAuthenticated) router.push("/stocks");

    return <Component {...props} />;
  };
}
