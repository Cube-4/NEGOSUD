import React from "react";
import { Box, Text } from "@chakra-ui/react";
import DataGrid from "./DataGrid";
import { UserAdding } from "../../components";
export default function MainContent({ user }: any) {
  return (
    <>
      <Box w="100%">
        <UserAdding />
        <Box mb="5vh">
          <Text color="white" fontSize="2xl">
            Liste des clients
          </Text>
        </Box>
        <Box w="90%">
          <DataGrid user={user} />
        </Box>
      </Box>
    </>
  );
}
