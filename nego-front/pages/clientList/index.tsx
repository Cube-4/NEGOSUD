import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
// Import components
import SimpleSidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function UserPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function onLoad() {
    const https = require("https");
    const agent = new https.Agent({ rejectUnauthorized: false });
    //Call the article API
    const response = await fetch("http://localhost:44312/api/user", {
      agent,
      method: "GET",
    } as any);
    const data = await response.json();
    setUser(data);
  }

  if (isLoading) {
    onLoad();
    setIsLoading(false);
  }
  return (
    user && (
      <Box pl={10} pt={5} bgColor="primary.700" w="100%" h="100%">
        <MainContent user={user} />
      </Box>
    )
  );
}
