import React, { useEffect } from "react";

function Cart() {
  let cartArrayMap;
  const [cartItems, setCartItems] = React.useState<any>([]);

  useEffect(() => {
    let cart: string;

    // Perform localStorage action
    cart = JSON.parse(localStorage.getItem("cart") || "[]");

    setCartItems(cart);
  }, []);

  let cartItemsElement = cartItems.map((item: any) => {
    return (
      <div key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.price}</p>
      </div>
    );
  });

  return (
    <>
      <h1>Mon panier</h1>
      {cartItemsElement}
    </>
  );
}

export default Cart;
