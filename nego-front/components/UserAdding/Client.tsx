import React from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";

function Client() {
  async function onSubmit(data: any) {
    axios
      .post("http://localhost:44312/api/user", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex direction={"column"} gap={"2vh"}>
        <Flex gap="2vw">
          <Flex direction={"column"}>
            <Text>Prénom</Text>
            <Input
              bgColor={"#7B849A"}
              borderColor={"#7B849A"}
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </Flex>
          <Flex direction={"column"}>
            <Text>Nom de famille</Text>
            <Input
              bgColor={"#7B849A"}
              borderColor={"#7B849A"}
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </Flex>
        </Flex>
        <Flex gap="2vw">
          <Flex direction={"column"}>
            <Text>Date de naissance</Text>
            <Input
              bgColor={"#7B849A"}
              borderColor={"#7B849A"}
              id="birthDate"
              name="birthDate"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.birthDate}
            />
          </Flex>
          <Flex direction={"column"}>
            <Text>E-mail</Text>
            <Input
              bgColor={"#7B849A"}
              borderColor={"#7B849A"}
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Flex>
          <Button type="submit">Ajouter un nouveau client</Button>
        </Flex>
      </Flex>
    </form>
  );
}

export default Client;
