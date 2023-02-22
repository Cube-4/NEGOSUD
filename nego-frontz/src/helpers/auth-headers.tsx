export default function authHeader() {
  // return authorization header with jwt token
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  if (token !== null) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
