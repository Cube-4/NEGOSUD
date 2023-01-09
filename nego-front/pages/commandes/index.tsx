import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
// Import components
import SimpleSidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function UserPage() {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function onLoad() {
    const https = require("https");
    const agent = new https.Agent({ rejectUnauthorized: false });
    //Call the article API
    const response = await fetch("https://localhost:7201/api/order", {
      agent,
      method: "GET",
    } as any);
    const data = await response.json();
    setOrder(data);
  }

  if (isLoading) {
    onLoad();
    setIsLoading(false);
  }
  return (
    order && (
      <>
        <Flex gap="0px" rowGap="0px">
          <Box>
            <SimpleSidebar />
          </Box>
          <Box pl={10} pt={5} bgColor="primary.700" w="100%">
            <MainContent order={order} />
          </Box>
        </Flex>
      </>
    )
  );
}