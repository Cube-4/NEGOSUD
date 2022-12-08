import { Box, Flex, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { InferGetStaticPropsType } from "next";
// import components
import SimpleSidebar from "./Sidebar";

export const getStaticProps = async () => {
  // call the binance api

  const https = require("https");
  const agent = new https.Agent({ rejectUnauthorized: false });

  const response = await fetch("https://localhost:44366/api/article", {
    agent,
    method: "GET",
  } as any);
  const data = await response.json();

  return {
    props: { data },
  };
};
export default function UserPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Flex gap="0px" rowGap="0px">
        <Box>
          <SimpleSidebar />
        </Box>
        <Box w="100%">
          <Text color="black">Hello</Text>
        </Box>
      </Flex>
    </>
  );
}
