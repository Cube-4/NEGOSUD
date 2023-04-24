import { useRouter } from "next/router";
export function withRouter(Comp) {
  return function AuthProtected(props) {
    const router = useRouter();
    if (!router.isReady) {
      return null;
    }
    return <Comp {...props} />;
  };
}
