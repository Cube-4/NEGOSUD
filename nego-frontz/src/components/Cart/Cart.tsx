import React from "react";
import { useEffect } from "react";
import { Paper, Text } from "@mantine/core";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = React.useState<any>([]);

  //get cart items from api
  const getCartItems = async () => {
    const response = await axios.get("http://localhost:44312/api/cart");
    setCartItems(response.data);
    console.log(response);
  };

  useEffect(() => {
    getCartItems();
  }, []);



  return (
    <>
      {/* {cartItems.map((item: any) => {
        return (
          <Paper shadow="xs" p="md" key={item.product} mb="1vh">
            <Text>Nom du produit : {item.product}</Text>
            <Text>Quantité : {item.quantity}</Text>
            <Text>Prix : {item.price}</Text>
          </Paper>
        );
      })} */}
      <div>hey</div>
    </>
  );
}
