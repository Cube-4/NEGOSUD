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
// Hooks
import useLogin from "../../hooks/useLogin";
import { useFormik } from "formik";
// Loader
import { useRouter } from "next/router";

export default function () {
  const router = useRouter();

  const submitForm = async (values: any) => {
    const { email, password } = values;

    await useLogin({
      email: email,
      password: password,
    }).then(() => router.push("/stocks"));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      submitForm(values).then(() => router.push("/stocks"));
    },
  });

  return (
    <>
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
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
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
            <Button fullWidth mt="xl" /* disabled={isLoading} */ type="submit">
              {/* isLoading ? "Loading..." : */ "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
      ;
    </>
  );
}
