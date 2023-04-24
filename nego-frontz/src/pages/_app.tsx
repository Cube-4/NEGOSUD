import { AppProps } from "next/app";
import { useState, createContext, useMemo, useEffect } from "react";
import Head from "next/head";
import { MantineProvider, AppShell, Navbar } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/components/AuthContext";
import dynamic from "next/dynamic";

function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <AuthProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
          }}
        >
          <NotificationsProvider position="top-center" autoClose={4000}>
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
          </NotificationsProvider>
        </MantineProvider>
      </AuthProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
