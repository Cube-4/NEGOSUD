import { useState, useEffect } from "react";
import { Navbar, Group, Code, Text, Button } from "@mantine/core";
import {
  useStyles,
  authenticatedDataUser,
  authenticatedDataAdmin,
  noAuthData,
} from "./styles";
import { IconLogout } from "@tabler/icons-react";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/router";
import { useAuth } from "../AuthContext";

export default function Sidebar() {
  const { isAuthenticated, isAdmin, roles } = useAuth();

  const logout = useLogout();
  const router = useRouter();

  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    function wichDataSet({
      isAuthenticated,
      isAdmin,
    }: {
      isAuthenticated: boolean;
      isAdmin: boolean;
    }) {
      if (isAuthenticated && isAdmin) {
        return authenticatedDataAdmin;
      } else if (isAuthenticated && !isAdmin) {
        return authenticatedDataUser;
      } else {
        return noAuthData;
      }
    }

    const links = wichDataSet({ isAuthenticated, isAdmin }).map((item) => (
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          setActive(item.label);
          router.push(item.link);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    ));

    setLinks(links);
  }, [
    isAuthenticated,
    isAdmin,
    active,
    classes.link,
    classes.linkActive,
    router,
  ]);

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Button
          onClick={() => {
            console.log(isAdmin);
          }}
        ></Button>
        <Group className={classes.header} position="apart">
          <Text weight={"bold"}>NegoSud</Text>{" "}
          <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
        </Group>
        {links}
      </Navbar.Section>

      {isAuthenticated && (
        <Navbar.Section className={classes.footer}>
          <a href="#" className={classes.link} onClick={logout}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Se déconnecter</span>
          </a>
        </Navbar.Section>
      )}
    </Navbar>
  );
}
