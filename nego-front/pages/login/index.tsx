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
  InputRightElement,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
//Components import
import PasswordInput from "./PasswordInput";
// Image import
import Image from "next/image";
import loginImage from "../../public/login-image.jpg";
// Next link
import Link from "next/link";
//Import Icons
import { BsFillPersonFill } from "react-icons/bs";

export default function Login() {
  return (
    <>
      <Flex w="100%" h="100vh">
        <Box w="60%" position={"relative"}>
          <Image
            src={loginImage}
            layout={"fill"}
            alt="Picture of a man working"
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </Box>
        <Box w="70%" bgColor="#272938" pl="2vw">
          <Flex direction={"column"} h="100%" justify={"center"}>
            <Flex direction="column" justify="center" h="50%">
              <Box h="30%">
                <Text fontSize="5xl" color="white">
                  Connectez-vous :{" "}
                </Text>
              </Box>
              <Box h="70%">
                <Grid gap="5vh">
                  <GridItem>
                    <InputGroup w="35%">
                      <Input
                        variant="filled"
                        placeholder="Nom d'utilisateur"
                        bgColor="#333645"
                        color="#7B849A"
                        _hover={{
                          bgColor: "#333645",
                        }}
                        _active={{ bgColor: "#333645" }}
                      />
                      <InputRightElement
                        color="#7B849A"
                        children={<Icon as={BsFillPersonFill} />}
                      />
                    </InputGroup>
                  </GridItem>
                  <GridItem>
                    <PasswordInput />
                  </GridItem>
                  <GridItem>
                    <Link href="/user">
                      <Button
                        bgColor="#5378FA"
                        _hover={{
                          bgColor: "#3B56B8",
                        }}
                        color="white"
                        fontWeight="light"
                        w="35%"
                      >
                        Me connecter
                      </Button>
                    </Link>
                  </GridItem>
                  <GridItem>
                    <Text fontSize="md" color="#7B849A" fontWeight="bold">
                      Mot de passe oublié ? Contactez un administrateur
                    </Text>
                  </GridItem>
                </Grid>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
