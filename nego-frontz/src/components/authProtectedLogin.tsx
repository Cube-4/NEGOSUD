import { useRouter } from "next/router";
import { useAuth } from "../components/AuthContext";
import { useEffect, useState } from "react";

export default function authProtectedLogin(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated } = useAuth();
    console.log("isAuthenticated", isAuthenticated);

    return <Component {...props} />;
  };
}
