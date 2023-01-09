import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import SimpleSidebar from "../components/Sidebar";

const theme = extendTheme({
  fonts: {
    heading: `'Work Sans', sans-serif`,
    body: `'Work Sans', sans-serif`,
  },
  colors: {
    primary: {
      300: "#7B849A",
      500: "#333645",
      700: "#272938",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Flex w="100%">
          <Box w="15%">
            <SimpleSidebar />
          </Box>
          <Box w="85%">
            <Component {...pageProps} />
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
}
