import React from "react";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import axios from "axios";
import authHeader from "@/helpers/auth-headers";
import { QuantityInput } from "../Stocks/UserStocks/quantityInput";
import useNotification from "@/hooks/useNotification";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function Cart() {
  const router = useRouter();
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
    setCartItems(response.data.articles);
  };
  const articlesForStripeApi = cartItems.map((item: any) => {
    return {
      price: item.article.stripePriceId,
      quantity: item.quantity,
    };
  });

  const checkoutToStripe = async () => {
    try {
      await axios
        .post("/api/checkout_sessions", articlesForStripeApi)
        .then((response) => {
          router.push(response.data.url);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const validateOrder = async () => {
    const { showErrorNotification, showSuccessNotification } =
      useNotification();

    const orderDate = new Date();
    const orderType = "removeStock";
    const referenceName = localStorage.getItem("id") + " " + orderType;
    const userId = localStorage.getItem("id");
    const order = {
      id: 0,
      orderName: "",
      orderDate: orderDate,
      orderType: orderType,
      referenceName: referenceName,
      userId: userId,
    };

    try {
      await axios
        .post("http://localhost:44312/api/order", order, {
          withCredentials: true,
          headers: authHeader(),
        })
        .then((response) => {
          showSuccessNotification("Commande validée avec succes");
          getCartItems();
        });
    } catch (error) {
      showErrorNotification("Veuillez renseigner une quantité valide");
    }
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
          await axios.post("http://localhost:44312/api/cart", updatedProduct, {
            withCredentials: true,
            headers: authHeader(),
          });
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
          await axios.delete("http://localhost:44312/api/cart", {
            withCredentials: true,
            headers: authHeader(),
            data: updatedProduct,
          });
          showSuccessNotification("Produit supprimé du panier");
          getCartItems();
        } else {
          showErrorNotification("Veuillez renseigner une quantité valide");
        }
      }

      return (
        <Paper shadow="xs" p="md" key={item.article.id} mb="1vh">
          <Flex direction="column" gap="3vh">
            <Flex gap="1vw">
              <Text weight={"bold"}>Nom du produit :</Text>
              <Text>{item.article.name}</Text>
            </Flex>

            <Flex gap="1vw">
              <Text weight={"bold"}>Prix unitaire :</Text>
              <Text> {item.article.price} €</Text>
            </Flex>
            <Flex gap="1vw">
              <Text weight={"bold"}>Quantité :</Text>
              <Text>{item.quantity}</Text>
            </Flex>
            <Flex gap="2vh" align="center">
              <QuantityInput
                min={0}
                max={item.quantity}
                value={value}
                setValue={setValue}
              />
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
            </Flex>
          </Flex>
        </Paper>
      );
    });
    return articles;
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      validateOrder().then(() => {
        console.log("Order placed! You will receive an email confirmation.");
      });
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
  return (
    <>
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <>
          <Flex direction="column" gap="3vh">
            <Articles />
            <Paper shadow="xs" p="md" mb="1vh">
              <Flex direction="column" gap="2vh">
                <Flex gap="1vw" align="center">
                  <IconCheck size="30px" color="green" />
                  <Text color="green" fz="14px">
                    Votre commande est éligible à la livraison Standard gratuite
                    en France métropolitaine.
                  </Text>
                </Flex>
                <Text>
                  Sous-total :{" "}
                  {cartItems.reduce(
                    (acc: any, item: any) => acc + item.totalPrice,
                    0
                  )}{" "}
                  €
                </Text>

                <Button radius="md" onClick={checkoutToStripe} w="30%">
                  {" "}
                  Passer la commande
                </Button>
              </Flex>
            </Paper>
          </Flex>
        </>
      ) : (
        <Paper shadow="xs" p="md" mb="1vh">
          <Text>Votre panier est vide.</Text>
        </Paper>
      )}
    </>
  );
}
