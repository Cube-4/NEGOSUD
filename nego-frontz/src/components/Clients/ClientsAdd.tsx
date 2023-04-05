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
import useUser from "@/hooks/useUser";

export default function () {
  const { classes } = useStyles();
  // Form handling
  const { mutate: user, isLoading, isError } = useUser();
  const { register, handleSubmit } = useForm();
  async function onSubmit(data: any) {
    user({
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      email: data.email,
      role: data.role,
    });
  }
  return (
    <Paper shadow="xl" className={classes.paper}>
      <Text mb={{ base: "2vh" }}>Passer une commande au fournisseur</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={{ base: "5vw" }} w="100%">
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Prénom"
              placeholder="Exemple : John"
              classNames={classes}
              {...register("firstName")}
            />
            <TextInput
              label="Nom de famille"
              placeholder="Exemple : Doe"
              classNames={classes}
              {...register("lastName")}
            />
          </Flex>
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="E-mail"
              placeholder="Exemple : johndoe@gmail.com"
              classNames={classes}
              {...register("email")}
            />
            <TextInput
              label="Mot de passe"
              classNames={classes}
              {...register("password")}
            />
          </Flex>
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Role de l'utilisateur"
              placeholder="Exemple : 1"
              classNames={classes}
              {...register("role")}
            />
            <Button fullWidth mt="xl" disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Ajouter l'utilisateur"}
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
