import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import Client from "./Client";

export default function UserAdding() {
  return (
    <Box bgColor={"#333645"}>
      <Tabs variant="enclosed" size="lg">
        <TabList>
          <Tab>
            <Text color="white">Clients</Text>
          </Tab>
          <Tab>
            <Text color="white">Fournisseurs</Text>
          </Tab>
          <Tab>
            <Text color="white">Articles</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Client />
          </TabPanel>
          <TabPanel>
            <p>Fournisseurs</p>
          </TabPanel>
          <TabPanel>
            <p>Articles</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
