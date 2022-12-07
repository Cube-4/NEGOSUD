import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
// Image import
import Image from "next/image";
import loginImage from "../../public/login-image.jpg";

export default function Login() {
  return (
    <>
      <Flex w="100%" h="100vh">
        <Box w="50%" position={"relative"}>
          <Image
            src={loginImage}
            layout={"fill"}
            alt="Picture of a man working"
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </Box>
        <Box w="50%">Image</Box>
      </Flex>
    </>
  );
}
