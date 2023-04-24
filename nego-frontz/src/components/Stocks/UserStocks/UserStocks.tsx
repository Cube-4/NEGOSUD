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
  TextInput,
  Select,
} from "@mantine/core";
import { QuantityInput } from "./quantityInput";
import { useStyles } from "./styles";
// Form handling
import { useForm } from "react-hook-form";
import { Console } from "console";
import axios from "axios";
import useNotification from "@/hooks/useNotification";
import authHeader from "@/helpers/auth-headers";
import { useFormik } from "formik";

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

export default function UserStocks({ articles }: any) {
  const { classes, theme } = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [articlesToRender, setArticlesToRender] = useState(articles);
  const [sortOption, setSortOption] = useState<string>("");

  const SearchHandler = (value: string) => {
    setSearchValue(value);
    searchItems(articles, value);
  };

  const SortHandler = (value: string) => {
    setSortOption(value);
    sortItems(articlesToRender, value);
  };

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
  async function onSubmit(product: any, value: number) {
    const updatedProduct = {
      articleId: product.id,
      quantity: value,
    };

    if (updatedProduct.quantity > 0) {
      await axios.post("http://localhost:44312/api/cart", updatedProduct, {
        withCredentials: true,
        headers: authHeader(),
      });
      showSuccessNotification("Produit ajouté au panier");
    } else {
      showErrorNotification("Veuillez renseigner une quantité valide");
    }
  }

  interface Item {
    id: number;
    name: string;
  }

  function searchItems(items: Item[], searchQuery: string) {
    const results: Item[] = [];
    const query = searchQuery.toLowerCase();

    for (const item of items) {
      const name = item.name.toLowerCase();

      if (name.includes(query)) {
        results.push(item);
      }
    }
    setArticlesToRender(results);
  }

  function sortItems(items: Item[], sortOption: string) {
    switch (sortOption) {
      case "PriceSort":
        setArticlesToRender(
          articlesToRender.sort(
            (a: { price: number }, b: { price: number }) => a.price - b.price
          )
        );
        console.log(articlesToRender);
        break;
      case "QuantitySort":
        setArticlesToRender(
          articlesToRender.sort(
            (a: { stock: number }, b: { stock: number }) => a.stock - b.stock
          )
        );
        console.log(articlesToRender);
        break;
      case "NameSort":
        setArticlesToRender(
          articlesToRender.sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
          )
        );
        console.log(articlesToRender);
        break;
      default:
        return items;
    }
  }

  function Cards() {
    let cards = articlesToRender.map((product: any) => {
      const [value, setValue] = useState(0);

      const formik = useFormik({
        initialValues: {
          quantity: "",
        },
        onSubmit: (values) => {
          onSubmit(product, value);
        },
      });

      return (
        <Card
          withBorder
          radius="md"
          p="md"
          className={classes.card}
          w="40%"
          key={product.id}
        >
          <form onSubmit={formik.handleSubmit}>
            <Card.Section>
              <Image src={mockData.image} alt={product.name} height={180} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
              <Text size="xl" weight={500}>
                {product.name}
              </Text>
              <Text
                mt="md"
                className={classes.priceLabel}
                color="dimmed"
                weight={"bold"}
              >
                Prix unitaire : {product.price} €
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
                    onChange={(value) => setValue(value as number)}
                    name="quantity"
                    max={product.stock}
                    min={0}
                  />
                </Box>
              </Flex>
              <Button radius="md" style={{ flex: 1 }} type="submit">
                Ajouter au panier
              </Button>
              <Badge size="sm">{product.origin}</Badge>
            </Group>
          </form>
        </Card>
      );
    });
    return cards;
  }

  return (
    <>
      <Flex gap={{ base: "5vw" }} w="100%" mb={"3vh"}>
        <TextInput
          placeholder="Your name"
          label="Search"
          value={searchValue}
          onChange={(e) => SearchHandler(e.currentTarget.value)}
        />
        <Select
          label="Sort by"
          placeholder="Pick one"
          data={[
            { value: "PriceSort", label: "Price" },
            { value: "QuantitySort", label: "Quantity" },
            { value: "NameSort", label: "Name" },
          ]}
          onChange={(selectedOption: string) => {
            SortHandler(selectedOption);
          }}
          value={sortOption}
        />
      </Flex>

      <Flex wrap={"wrap"} gap="2vw" justify={"center"}>
        {articlesToRender && <Cards />}
      </Flex>
    </>
  );
}
