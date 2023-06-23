import { type ActionArgs, redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Button, Input, Logo, Message, Title } from "~/components";

import logo from "../images/logo.svg";

type FormData = {
  clearMessage: string;
  email: string;
  password: string;
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as FormData;

  if (data.clearMessage) {
    return json({
      success: "",
      error: "",
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }

  if (!data.email || !data.password) {
    return json({
      success: "",
      error: "As informações para login são necessárias",
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }

  // TODO: Validar contra as informações vindas do banco de dados

  if (data.email !== "email@email.com" || data.password !== "123456") {
    return json({
      success: "",
      error: "E-mail ou senha inválidos",
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }

  return redirect(`/login`);
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="flex justify-center items-center h-screen relative">
      <Message
        success={actionData?.success}
        error={actionData?.error}
        fields={[
          { name: "email", value: actionData?.data.email },
          { name: "password", value: actionData?.data.password },
        ]}
        autoClose={2000}
      />

      <div className="grid gap-6 px-4">
        <Logo />
        <Title>Processamento de Pagamentos</Title>

        <Form method="POST" className="grid gap-4">
          <Input label="E-mail:" type="email" />
          <Input label="Senha:" type="password" />
          <Button>Entrar</Button>
        </Form>

        <a
          href="/login"
          className="
            justify-self-center
            text-blue-500
            hover:underline
          "
        >
          Esqueci minha senha
        </a>
      </div>
    </main>
  );
}
