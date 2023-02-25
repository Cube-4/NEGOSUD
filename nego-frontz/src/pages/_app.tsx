import { AppProps } from "next/app";
import { useState, createContext, useMemo, useEffect } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { AppShell, Navbar } from "@mantine/core";
import { Sidebar } from "@/components/Sidebar";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserContext } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state variable

  const { isAuth, setIsAuth } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  const value = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      isAuth,
      setIsAuth,
      isAdmin,
      setIsAdmin,
    }), // Add isAuthenticated and setIsAuthenticated to the value object
    [
      isAuthenticated,
      setIsAuthenticated,
      isAuth,
      setIsAuth,
      isAdmin,
      setIsAdmin,
    ]
  );

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <UserContext.Provider value={value}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
          }}
        >
          <NotificationsProvider position="top-center" autoClose={4000}>
            <QueryClientProvider client={queryClient}>
              <AppShell
                padding="md"
                navbar={
                  <Navbar width={{ base: 300 }} p="xs">
                    <Sidebar />
                  </Navbar>
                }
                styles={(theme) => ({
                  main: {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[0],
                  },
                })}
              >
                <Component {...pageProps} />
              </AppShell>
            </QueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
      </UserContext.Provider>
    </>
  );
}
