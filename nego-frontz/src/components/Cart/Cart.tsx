import React from "react";
import { useEffect } from "react";
import { Paper, Text } from "@mantine/core";

export default function Cart() {
  const [cartItems, setCartItems] = React.useState<any>([]);

  useEffect(() => {
    let cart;

    // Perform localStorage action

    const cartData = localStorage.getItem("cart");
    if (cartData) {
      cart = JSON.parse(cartData);
    }

    setCartItems(cart);
  }, []);
  return (
    <>
      {cartItems.map((item: any) => {
        return (
          <Paper shadow="xs" p="md" key={item.product} mb="1vh">
            <Text>Nom du produit : {item.product}</Text>
            <Text>Quantité : {item.quantity}</Text>
            <Text>Prix : {item.price}</Text>
          </Paper>
        );
      })}
    </>
  );
}
