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
import { useForm } from "react-hook-form";
import { showNotification } from "@mantine/notifications";
import useUser from "@/hooks/useUser";
import { useRef, useState } from "react";

export default function () {
  const { classes } = useStyles();
  // Form handling
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [role, setRole] = useState<any>();

  async function onSubmit() {
    if (firstName && lastName && email && password && role) {
      useUser({
        firstName,
        lastName,
        email,
        password,
        role,
      });
    }
  }

  return (
    <Paper shadow="xl" className={classes.paper}>
      <Text mb={{ base: "2vh" }}>Passer une commande au fournisseur</Text>
      <Flex gap={{ base: "5vw" }} w="100%">
        <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
          <TextInput
            label="Prénom"
            placeholder="Exemple : John"
            classNames={classes}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            label="Nom de famille"
            placeholder="Exemple : Doe"
            classNames={classes}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Flex>
        <Flex gap={{ base: "0.5vh" }} className={classes.inputFlex}>
          <TextInput
            label="E-mail"
            placeholder="Exemple : johndoe@gmail.com"
            classNames={classes}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
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
            label="Role"
            onChange={setRole}
          />
          <Button fullWidth onClick={onSubmit}>
            Ajouter l'utilisateur
          </Button>
        </Flex>
      </Flex>
    </Paper>
  );
}
