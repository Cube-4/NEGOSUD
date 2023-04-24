import React from "react";
import { useEffect, useState } from "react";
import { Button, Group, Paper, Text } from "@mantine/core";
import axios from "axios";
import authHeader from "@/helpers/auth-headers";
import { QuantityInput } from "../Stocks/UserStocks/quantityInput";
import useNotification from "@/hooks/useNotification";

export default function Cart() {
  const [cart, setCart] = React.useState<any>([]);
  const [cartItems, setCartItems] = React.useState<any>([]);

  //get cart items from api
  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const response = await axios.get("http://localhost:44312/api/cart", {
      withCredentials: true,
      headers: authHeader(),
    });
    setCart(response.data);
    setCartItems(response.data.articles);
    console.log(response.data);
  };

  const validateOrder = async () => {
    const orderName = localStorage.getItem("userMail");
    const orderDate = new Date();
    const orderType = "removeStock";
    const referenceName = "commande de " + localStorage.getItem("userId") + " " + orderType;
    const userId = localStorage.getItem("userId");
    const order = {
      orderName: orderName,
      orderDate: orderDate,
      orderType: orderType,
      referenceName: referenceName,
      userId: userId,
    };
    const response = await axios.post(
      "http://localhost:44312/api/order",
      order,
      {
        withCredentials: true,
        headers: authHeader(),
      }
    );
    console.log(response);
  };

  function Articles() {
    const { showErrorNotification, showSuccessNotification } =
      useNotification();

    let articles = cartItems.map((item: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(0);

      async function onAddSubmit() {
        const updatedProduct = {
          articleId: item.article.id,
          quantity: value,
        };
        if (updatedProduct.quantity > 0) {
          const response = await axios.post(
            "http://localhost:44312/api/cart",
            updatedProduct,
            {
              withCredentials: true,
              headers: authHeader(),
            }
          );
          showSuccessNotification("Produit ajouté au panier");
          getCartItems();
        } else {
          showErrorNotification("Veuillez renseigner une quantité valide");
        }
      }

      async function onRemoveSubmit() {
        const updatedProduct = {
          articleId: item.article.id,
          quantity: value,
        };
        if (updatedProduct.quantity > 0) {
          const response = await axios.delete(
            "http://localhost:44312/api/cart",
            {
              withCredentials: true,
              headers: authHeader(),
              data: updatedProduct,
            }
          );
          showSuccessNotification("Produit supprimé du panier");
          getCartItems();
        } else {
          showErrorNotification("Veuillez renseigner une quantité valide");
        }
      }

      return (
        <Paper shadow="xs" p="md" key={item.article.id} mb="1vh">
          <Text>Nom du produit : {item.article.name}</Text>
          <Text>Quantité : {item.quantity}</Text>
          <Text>Prix unitaire : {item.article.price}</Text>
          <Text>Prix : {item.totalPrice}</Text>
          <Group position="center">
            <QuantityInput
              min={0}
              max={item.quantity}
              value={value}
              setValue={setValue}
            ></QuantityInput>
            <Button
              radius="md"
              style={{ flex: 1 }}
              onClick={onAddSubmit}
              disabled={value === 0}
            >
              {" "}
              Ajouter au panier
            </Button>
            <Button
              radius="md"
              style={{ flex: 1 }}
              onClick={onRemoveSubmit}
              disabled={value === 0}
            >
              {" "}
              Supprimer du panier
            </Button>
          </Group>
        </Paper>
      );
    });
    return articles;
  }

  return (
    <>
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <>
          <Articles></Articles>
          <Paper shadow="xs" p="md" mb="1vh">
            <Text>
              Total :{" "}
              {cartItems.reduce(
                (acc: any, item: any) => acc + item.totalPrice,
                0
              )}
            </Text>
            <Button
              radius="md"
              style={{ flex: 1 }}
              onClick={validateOrder}
            >
              {" "}
              Passer la commande
            </Button>
          </Paper>
        </>
      ) : (
        <Paper shadow="xs" p="md" mb="1vh">
          <Text>Votre panier est vide.</Text>
        </Paper>
      )}
    </>
  );
}
