import { Box, Flex, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { InferGetStaticPropsType } from "next";
// import components
import SimpleSidebar from "./Sidebar";
import MainContent from "./MainContent";

export const getStaticProps = async () => {
  const https = require("https");
  const agent = new https.Agent({ rejectUnauthorized: false });
  //Call the article API
  const response = await fetch("https://localhost:44366/api/article", {
    agent,
    method: "GET",
  } as any);
  const articles = await response.json();
  return {
    props: { articles },
  };
};

export default function UserPage({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Flex gap="0px" rowGap="0px">
        <Box>
          <SimpleSidebar />
        </Box>
        <Box pl={10} pt={5}  bgColor="primary.700" w="100%">
          <MainContent />
        </Box>
      </Flex>
    </>
  );
}
