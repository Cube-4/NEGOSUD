import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  paper: {
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  input: {
    height: "auto",
    paddingTop: 18,
  },
  inputFlex: {
    flexDirection: "column",
    width: "50%",
  },
  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));
