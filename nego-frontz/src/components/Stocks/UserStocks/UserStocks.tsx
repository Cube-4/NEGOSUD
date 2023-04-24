/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  Flex,
  Box,
  NumberInput,
} from "@mantine/core";
import { QuantityInput } from "./quantityInput";
import { useStyles } from "./styles";
// Form handling
import { useForm } from "react-hook-form";
import { Console } from "console";
import axios from "axios";
import useNotification from "@/hooks/useNotification";
import authHeader from "@/helpers/auth-headers";

const mockData = {
  image:
    "https://plus.unsplash.com/premium_photo-1675879277227-0b7eae8459f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",

  badges: [
    {
      emoji: "☀️",
      label: "Sunny weather",
    },
    {
      emoji: "🦓",
      label: "Onsite zoo",
    },
    {
      emoji: "🌊",
      label: "Sea",
    },
    {
      emoji: "🌲",
      label: "Nature",
    },
    {
      emoji: "🤽",
      label: "Water sports",
    },
  ],
};

export default function UserStocks ({ products }: any) {
  const { classes, theme } = useStyles();

  console.log(articles);

  const features = mockData.badges?.map((badge) => (
    <Badge
      color={theme.colorScheme === "dark" ? "dark" : "gray"}
      key={badge.label}
      leftSection={badge.emoji}
    >
      {badge.label}
    </Badge>
  ));

  // Form handling

  function Cards() {

    const { showErrorNotification, showSuccessNotification } = useNotification();

    let cards = products.map((product: any) => {
      const [value, setValue] = useState(0);
      async function onSubmit() {
        const updatedProduct = { 
          articleId: product.id, 
          quantity: value 
        };
        if (updatedProduct.quantity > 0) {
          const response = await axios.post('http://localhost:44312/api/cart', updatedProduct, {
            withCredentials: true,
            headers: authHeader(),
          });
          showSuccessNotification("Produit ajouté au panier");
        } else {
          showErrorNotification("Veuillez renseigner une quantité valide");
        }
      }

      return (
        <Card withBorder radius="md" p="md" className={classes.card} w="40%" key = {product.id}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card.Section>
              <Image src={mockData.image} alt={product.name} height={180} />
            </Card.Section>

          <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text size="xl" weight={500}>
                {product.name}
              </Text>
              <Text
                mt="md"
                color="dimmed"
                weight={"bold"}
                className={classes.quantityLabel}
              >
                Quantité disponible : {product.stock}
              </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
              <Text mt="md" className={classes.label} color="dimmed">
                Perfect for you, if you enjoy
              </Text>
              <Group spacing={7} mt={5}>
                {features}
              </Group>
            </Card.Section>

            <Group mt="xs">
              <Flex gap="1vw" align="baseline">
                <Text mt="md" color="dimmed" fz="md">
                  {" "}
                  Quantité souhaitée :{" "}
                </Text>
                <Box w="40%">
                  <NumberInput
                    value={value}
                    onChange={(val: number) => setValue(val)}
                    max={product.stock}
                    min={0}
                  />
                </Box>
              </Flex>
              <Button
                radius="md"
                style={{ flex: 1 }}
                type="submit"
                disabled={value === 0}
              >
                Ajouter au panier
              </Button>
            </Group>
          </Card.Section>

          <Group mt="xs">
            <Flex gap="1vw" align="baseline">
              <Text mt="md" color="dimmed" fz="md">
                {" "}
                Quantité souhaitée :{" "}
              </Text>
              <Box w="40%">
                <NumberInput
                  value={value}
                  onChange={(val: number) => setValue(val)}
                  max={product.quantity}
                />
              </Box>
            </Flex>
            <Button
              radius="md"
              style={{ flex: 1 }}
              type="submit"
              disabled={value === 0}
            >
              Ajouter au panier
            </Button>
          </Group>
        </Card>
      );
    });

 
}
