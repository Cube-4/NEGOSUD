import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "react-hook-form";
// Hooks
import useLogin from "@/hooks/useLogin";
import { showNotification } from "@mantine/notifications";

export default function () {
  const { mutate: login, isLoading, isError } = useLogin();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data: any) {
    login({ email: data.email, password: data.password });
    if (isError) {
      showNotification({
        color: "red",
        title: "Erreur de connexion",
        message: "Veuillez vérifier vos identifiants",
      });
    }
  }

  return (
    <Container size="xs" my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Bienvenue sur le gestionnaire NegoSud !
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...register("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...register("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" disabled={isLoading} type="submit">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
