import React, { useEffect } from "react";
import { authProtected } from "@/components/authProtected";
import { UserCart } from "@/components/Cart";

function Cart() {
  return (
    <>
      <h1>Mon panier </h1>
      <UserCart />
    </>
  );
}

export default authProtected(Cart);
