import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: "bold",
  },
  priceLabel: {
    fontSize: theme.fontSizes.md,
    fontWeight: "bold",
    color: theme.colors.gray[7],
  },
  quantityLabel: {
    fontSize: theme.fontSizes.md,
    fontWeight: "bold",
    color: theme.colors.red[5],
  },
}));
