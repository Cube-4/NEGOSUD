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
import useArticle from "@/hooks/useArticle";
import { useFormik } from "formik";

export default function () {
  const { classes } = useStyles();
  // Form handling

  async function submitForm(values: any) {
    const { name, reference, origin, stock, price, id } = values;
    useArticle({ name, reference, origin, stock, price, id });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      reference: "",
      origin: "",
      stock: "",
      price: "",
      id: "",
    },
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  return (
    <Paper shadow="xl" className={classes.paper}>
      <Text mb={{ base: "2vh" }}>Passer une commande au fournisseur</Text>
      <form onSubmit={formik.handleSubmit}>
        <Flex gap={{ base: "5vw" }} w="100%">
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Nom de l'article"
              placeholder="Exemple : Grand cru de bordeaux"
              classNames={classes}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
            />
            <TextInput
              label="Référence de l'article"
              placeholder="Exemple : 23413x24"
              classNames={classes}
              onChange={(e) =>
                formik.setFieldValue("reference", e.target.value)
              }
            />
          </Flex>
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Origine de l'article"
              placeholder="Exemple : Médoc"
              classNames={classes}
              onChange={(e) => formik.setFieldValue("origin", e.target.value)}
            />
            <TextInput
              label="Stock de l'article"
              classNames={classes}
              onChange={(e) => formik.setFieldValue("stock", e.target.value)}
            />
          </Flex>
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Prix de l'article"
              placeholder="Exemple : 100"
              classNames={classes}
              onChange={(e) => formik.setFieldValue("price", e.target.value)}
            />
            <TextInput
              label="Id de l'utilisateur"
              placeholder="Exemple : 1"
              classNames={classes}
              onChange={(e) => formik.setFieldValue("id", e.target.value)}
            />
            <Button fullWidth mt="xl" /* disabled={isLoading} */ type="submit">
              {/* isLoading ? "Loading..." : */ "Ajouter l'article"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
}
