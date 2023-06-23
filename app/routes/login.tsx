import { type ActionArgs, redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Message } from "~/components";

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
        <img
          src={logo}
          alt="IHDI Logo"
          className="
            w-40
            md:w-auto
            justify-self-center
          "
        />

        <h1 className="text-3xl font-bold text-center">
          Processamento de Pagamentos
        </h1>

        <Form method="POST" className="grid gap-4">
          <label className="grid font-bold">
            E-mail
            <input
              type="email"
              name="email"
              className="
                px-4
                py-2
                outline-none
                rounded
                border-2
                border-gray-300
                font-normal
                text-lg
                hover:border-blue-500
                focus:border-blue-700
                focus:text-blue-600
                transition-all
                duration-300
              "
            />
          </label>

          <label className="grid font-bold">
            Senha
            <input
              type="password"
              name="password"
              className="
                px-4
                py-2
                outline-none
                rounded
                border-2
                border-gray-300
                font-normal
                text-lg
                hover:border-blue-500
                focus:border-blue-700
                focus:text-blue-600
                transition-all
                duration-300
              "
            />
          </label>

          <button
            className="
              px-4
              py-2
              outline-none
              border-2
              border-blue-500
              rounded
              text-white
              font-bold
              text-lg
              bg-blue-500
              hover:bg-blue-600
              active:bg-blue-700
              focus:border-blue-700
              transition-all
              duration-300
            "
          >
            Entrar
          </button>
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
