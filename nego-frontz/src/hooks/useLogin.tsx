import axios from "axios";

export default function useLogin({ email, password, setIsAuthenticated }: any) {
  const data = {
    email: email,
    password: password,
  };

  axios
    .post("http://localhost:44312/api/user/authenticate", data)
    .then((response) => {
      console.log(response.data.result);

      // Save token to local storage
      localStorage.setItem("token", response.data.result.token);
      // Save roles to local storage
      localStorage.setItem("roles", response.data.result.roles);
      // Save user id to local storage
      localStorage.setItem("id", response.data.result.id);
      // Update auth state
      setIsAuthenticated(true);
    })
    .catch((error: any) => {
      if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw error;
      }
    });
}
