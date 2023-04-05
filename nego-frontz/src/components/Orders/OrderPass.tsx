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
import { showNotification } from "@mantine/notifications";
import useOrder from "@/hooks/useOrder";

export default function () {
  const { classes } = useStyles();
  // Form handling
  const { mutate: order, isLoading, isError } = useOrder();
  const { register, handleSubmit } = useForm();
  async function onSubmit(data: any) {
    order({
      orderName: data.orderName,
      referenceName: data.referenceName,
      quantity: data.quantity,
    });
  }
  return (
    <Paper shadow="xl" className={classes.paper}>
      <Text mb={{ base: "2vh" }}>Passer une commande au fournisseur</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={{ base: "5vw" }} w="100%">
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Nom de la commande"
              placeholder="Exemple : Commande de vin rouge"
              classNames={classes}
              {...register("orderName")}
            />
            <TextInput
              label="Référence de la commande"
              placeholder="Exemple : 2023-02-15"
              classNames={classes}
              {...register("referenceName")}
            />
          </Flex>
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextAndSelect
              textInputType={"number"}
              classes={classes}
              textLabel={"Quantité de l'article"}
              textPlaceholder={"Exemple : 100"}
              selectLabel={"Nom de l'article"}
              selectPlaceholder={"Choisissez un article"}
              selectData={["Grand Cru", "Champagne", "Rosé ", "Vin rouge"]}
              register={register}
            />
          </Flex>
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <Button fullWidth mt="xl" disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Passer la commande"}
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
