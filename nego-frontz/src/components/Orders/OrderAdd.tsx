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
import { useFormik } from "formik";
import useOrder from "@/hooks/useOrder";

export default function () {
  const { classes } = useStyles();

  const formik = useFormik({
    initialValues: {
      orderName: "",
      orderType: "",
      referenceName: "",
      userId: "",
    },
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  async function submitForm(values: any) {
    const { orderName, orderType, referenceName } = values;
    const orderDateFormated = new Date();
    const id = localStorage.getItem("id");

    useOrder({
      orderName,
      orderDate: orderDateFormated,
      orderType,
      referenceName,
      userId: id,
    });
  }

  return (
    <Paper shadow="xl" className={classes.paper}>
      <form onSubmit={formik.handleSubmit}>
        {" "}
        <Text mb={{ base: "2vh" }}>Passer une commande au fournisseur</Text>
        <Flex gap={{ base: "5vw" }} w="100%">
          <Flex gap={{ base: "1vh" }} className={classes.inputFlex}>
            <TextInput
              label="Nome de la commande"
              placeholder="Exemple : Grand cru"
              classNames={classes}
              value={formik.values.orderName}
              onChange={(e) =>
                formik.setFieldValue("orderName", e.target.value)
              }
            />
            <TextInput
              label="Type de la commande "
              placeholder="Exemple : Vin rouge"
              classNames={classes}
              value={formik.values.orderType}
              onChange={(e) =>
                formik.setFieldValue("orderType", e.target.value)
              }
            />
          </Flex>
          <Flex gap={{ base: "0.5vh" }} className={classes.inputFlex}>
            <TextInput
              label="Réference de la commande"
              classNames={classes}
              value={formik.values.referenceName}
              onChange={(e) =>
                formik.setFieldValue("referenceName", e.target.value)
              }
            />
            <Button fullWidth type="submit">
              Passer la commande
            </Button>
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
}
