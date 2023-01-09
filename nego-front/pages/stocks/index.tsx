import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
// Import components
import MainContent from "./MainContent";

export default function UserPage() {
  const [articles, setArticles] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function onLoad() {
    const https = require("https");
    const agent = new https.Agent({ rejectUnauthorized: false });
    //Call the article API
    const response = await fetch("http://localhost:44312/api/article", {
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
      <Box pl={10} pt={5} bgColor="primary.700" w="100%" h="100%">
        <MainContent articles={articles} />
      </Box>
    )
  );
}
