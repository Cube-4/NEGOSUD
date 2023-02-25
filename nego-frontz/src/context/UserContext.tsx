import { createContext } from "react";

export const UserContext = createContext<{
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAuth: false,
  setIsAuth: () => {},
});
