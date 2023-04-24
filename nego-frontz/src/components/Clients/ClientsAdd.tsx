import {
  Paper,
  Text,
  Flex,
  Button,
  TextInput,
  NumberInput,
  PasswordInput,
} from "@mantine/core";
import { useStyles } from "./styles";
// Form handling
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { useFormik } from "formik";

export default function () {
  const { classes } = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roles: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      submitForm(values);
    },
  });

  async function submitForm(values: any) {
    const { firstName, lastName, email, password, roles } = values;
    const rolesArray: number[] = [];
    rolesArray.push(values.roles);
    console.log(rolesArray, "type", typeof rolesArray);
    useUser({ firstName, lastName, email, password, roles: rolesArray });
  }

  return (
    <Paper shadow="xl" className={classes.paper}>
      <form onSubmit={formik.handleSubmit}>
        {" "}
        <Text mb={{ base: "2vh" }}>Passer une commande au fournisseur</Text>
        <Flex gap={{ base: "5vw" }} w="100%">
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Prénom"
              placeholder="Exemple : John"
              classNames={classes}
              value={formik.values.firstName}
              onChange={(e) =>
                formik.setFieldValue("firstName", e.target.value)
              }
            />
            <TextInput
              label="Nom de famille"
              placeholder="Exemple : Doe"
              classNames={classes}
              value={formik.values.lastName}
              onChange={(e) => formik.setFieldValue("lastName", e.target.value)}
            />
          </Flex>
          <Flex gap={{ base: "0.5vh" }} className={classes.inputFlex}>
            <TextInput
              label="E-mail"
              placeholder="Exemple : johndoe@gmail.com"
              classNames={classes}
              value={formik.values.email}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
            />

            <PasswordInput
              label="Password"
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
            />
          </Flex>
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <NumberInput
              size="md"
              min={0}
              max={2}
              defaultValue={0}
              placeholder="Your age"
              withAsterisk
              name="roles"
              label="Role"
              onChange={(e) => {
                formik.setFieldValue("roles", e);
              }}
            />
            <Button fullWidth type="submit">
              Ajouter l'utilisateur
            </Button>
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
}
