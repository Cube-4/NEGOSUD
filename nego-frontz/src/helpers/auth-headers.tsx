export default function authHeader() {
  // return authorization header with jwt token
  let token = localStorage.getItem("token");

  if (token !== null) {

    return { Authorization: "Bearer " + token.replace(/['"]+/g, '') };

  } else {

    return {};

  }
}

export default authHeader;
