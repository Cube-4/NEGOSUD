import React from "react";
import { useEffect } from "react";
import { Paper, Text } from "@mantine/core";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = React.useState<any>([]);

  //get cart items from api
  useEffect(() => {
    getCartItems();
  }, []);

  // const getCartItems = async () => {
  //   const response = await axios.get("http://localhost:44312/api/cart");
  //   setCartItems(response.data);
  //   console.log(response);
  // };

  //fake data
  const getCartItems = async () => {
  const response = {
      articles: [
        {
          "articleId": 1,
          "article": {
            "name": "Château Lafite Rothschild",
            "reference": "ABC123",
            "date": "2023-04-01T09:15:25.1",
            "origin": "Bordeaux, France",
            "stock": 232,
            "price": 1599.99,
            "orders": [],
            "carts": null,
            "userId": 2,
            "user": null,
            "id": 1
          },
          "cartId": 0,
          "cart": null,
          "quantity": 4,
          "totalPrice": 6399.96,
          "id": 0
        },
        {
          "articleId": 2,
          "article": {
            "name": "Opus One",
            "reference": "DEF456",
            "date": "2023-03-30T16:22:10.4",
            "origin": "Napa Valley, California",
            "stock": 35,
            "price": 299.99,
            "orders": [],
            "carts": null,
            "userId": 2,
            "user": null,
            "id": 2
          },
          "cartId": 0,
          "cart": null,
          "quantity": 4,
          "totalPrice": 1199.96,
          "id": 0
        }
      ],
      "totalPrice": 7599.92,
      "id": 0
    }
    setCartItems(response.articles);
  }

  const log = () => {
    console.log(cartItems);
  };

  return (
    <>
      {cartItems && cartItems.map((item: any) => {
        return (
          <Paper shadow="xs" p="md" key={item.article.id} mb="1vh">
            <Text>Nom du produit : {item.article.name}</Text>
            <Text>Quantité : {item.quantity}</Text>
            <Text>Prix : {item.totalPrice}</Text>
          </Paper>
        );
      })}
      <Paper shadow="xs" p="md" mb="1vh">
        <Text>Total : {cartItems && cartItems.reduce((acc: any, item: any) => acc + item.totalPrice, 0)}</Text>
      </Paper>
    </>
  );
}
