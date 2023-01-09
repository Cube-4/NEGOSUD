import React from "react";
import { Box, Text } from "@chakra-ui/react";
import DataGrid from "./DataGrid";
export default function MainContent({ user }: any) {
  return (
    <>
      <Box w="100%">
        <Box mb="5vh">
          <Text color="white" fontSize="2xl">
            Liste du stock
          </Text>
        </Box>
        <Box w="60%">
          <DataGrid user={user}/>
        </Box>
      </Box>
    </>
  );
}
