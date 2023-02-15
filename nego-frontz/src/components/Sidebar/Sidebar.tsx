import { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Navbar, Group, Code, Text } from "@mantine/core";
import {
  useStyles,
  authenticatedDataUser,
  authenticatedDataAdmin,
  noAuthData,
} from "./styles";
import { IconLogout } from "@tabler/icons-react";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/router";

export default function () {
  const { isAuth, isAdmin } = useContext(UserContext);
  const logout = useLogout();
  const router = useRouter();

  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  function wichDataSet({ isAuth, isAdmin }: any) {
    if (isAuth && isAdmin) {
      return authenticatedDataAdmin;
    } else if (isAuth && !isAdmin) {
      return authenticatedDataUser;
    } else {
      return noAuthData;
    }
  }

  const links = wichDataSet({ isAdmin, isAuth }).map((item) => (
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

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text weight={"bold"}>NegoSud</Text>{" "}
          <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
        </Group>
        {links}
      </Navbar.Section>

      {isAuth && (
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
