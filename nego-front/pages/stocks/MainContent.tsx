import React from "react";
import { Box, Text } from "@chakra-ui/react";
import DataGrid from "./DataGrid";
export default function MainContent({ articles }: any) {
  return (
    <>
      <Box w="100%" h="100%">
        <Box mb="5vh">
          <Text color="white" fontSize="2xl">
            Liste du stock
          </Text>
        </Box>
        <Box w="90%">
          <DataGrid articles={articles} />
        </Box>
      </Box>
    </>
  );
}
