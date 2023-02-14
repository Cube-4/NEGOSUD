import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, Flex, Box, AppShell, Navbar } from "@mantine/core";

import { Sidebar } from "../components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <AppShell
        navbar={
          <Navbar width={{ base: 300 }} height={500} p="xs">
            <Sidebar />
          </Navbar>
        }
      >
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}
