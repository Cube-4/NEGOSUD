import {
  Paper,
  Text,
  Flex,
  Button,
  Select,
  TextInput,
  Box,
} from "@mantine/core";
import { useStyles } from "./styles";
// Form handling
import { useForm } from "react-hook-form";
import usearticle from "@/hooks/useArticle";

export default function () {
  const { classes } = useStyles();
  // Form handling
  const { mutate: article, isLoading, isError } = usearticle();
  const { register, handleSubmit } = useForm();
  async function onSubmit(data: any) {
    article({
      name: data.name,
      reference: data.reference,
      origin: data.origin,
      stock: data.stock,
      price: data.price,
      id: data.id,
    });
  }
  return (
    <Paper shadow="xl" className={classes.paper}>
      <Text mb={{ base: "2vh" }}>Passer une commande au fournisseur</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={{ base: "5vw" }} w="100%">
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Nom de l'article"
              placeholder="Exemple : Grand cru de bordeaux"
              classNames={classes}
              {...register("name")}
            />
            <TextInput
              label="Référence de l'article"
              placeholder="Exemple : 23413x24"
              classNames={classes}
              {...register("reference")}
            />
          </Flex>
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Origine de l'article"
              placeholder="Exemple : Médoc"
              classNames={classes}
              {...register("origin")}
            />
            <TextInput
              label="Stock de l'article"
              classNames={classes}
              {...register("stock")}
            />
          </Flex>
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Prix de l'article"
              placeholder="Exemple : 100"
              classNames={classes}
              {...register("role")}
            />
            <TextInput
              label="Id de l'utilisateur"
              placeholder="Exemple : 1"
              classNames={classes}
              {...register("id")}
            />
            <Button fullWidth mt="xl" disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Ajouter l'article"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
}

export function TextAndSelect({
  classes,
  textLabel,
  selectLabel,
  textPlaceholder,
  selectPlaceholder,
  selectData,
  textInputType,
  register,
}: any) {
  return (
    <>
      <Box>
        <Select
          data={selectData}
          placeholder={selectPlaceholder}
          label={selectLabel}
          classNames={classes}
          //   {...register("article")}
        />
      </Box>
      <Box w="100%">
        <TextInput
          type={textInputType}
          label={textLabel}
          placeholder={textPlaceholder}
          classNames={classes}
          {...register("quantity")}
        />
      </Box>
    </>
  );
}
