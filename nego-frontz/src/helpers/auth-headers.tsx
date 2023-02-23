import { useEffect } from "react";

function authHeader() {
  // -- Return authorization header with jwt token --//
  let token = localStorage.getItem("token");
  console.log("OK", token);
  if (token !== null && token !== undefined) {
    return { Authorization: "Bearer " + token };
  } else {
    return { Authorization: "No token found" };
  }
}

export default authHeader;
