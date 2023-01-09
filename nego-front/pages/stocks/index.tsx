import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
// Import components
import SimpleSidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function UserPage() {
  const [articles, setArticles] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function onLoad() {
    const https = require("https");
    const agent = new https.Agent({ rejectUnauthorized: false });
    //Call the article API
    const response = await fetch("https://localhost:7201/api/article", {
      agent,
      method: "GET",
    } as any);
    const data = await response.json();
    setArticles(data);
  }

  if (isLoading) {
    onLoad();
    setIsLoading(false);
  }
  return (
    articles && (
      <>
        <Flex gap="0px" rowGap="0px">
          <Box>
            <SimpleSidebar />
          </Box>
          <Box pl={10} pt={5} bgColor="primary.700" w="100%">
            <MainContent articles={articles} />
          </Box>
        </Flex>
      </>
    )
  );
}
