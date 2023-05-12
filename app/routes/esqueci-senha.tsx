import { Form, Link, useActionData } from '@remix-run/react';
import { type ActionArgs, json } from "@remix-run/node"

import { Button, Input, Logo, Message, Title } from '~/components';

// Form data type
type FormData = {
  cleanMessage: string
  email: string
}

/**
 * Action function
 * @param param0 
 * @returns data object
 */
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { cleanMessage, email } = Object.fromEntries(formData) as FormData
  
  if (cleanMessage) {
    return json({
      error: '',
      success: '',
      data: {
        email
      }
    }, {
      status: 200
    })
  }

  if (!email) {
    return json({
      error: 'Informe um e-mail para solicitar a nova senha',
      success: '',
      data: {
        email
      }
    }, {
      status: 400
    })
  }

  // TODO: Validar contra as informações vindas do banco de dados
  if (email !== 'email@email.com') {
    return json({
      error: 'E-mail não cadastrado. Favor entrar em contato com o Administrador.',
      success: '',
      data: {
        email
      }
    }, {
      status: 404
    })
  }

  return json({
    error: '',
    success: 'Senha provisória enviada para o seu e-mail',
    data: {
      email: ''
    }
  })
};

/**
 * View
 * @returns JSX 
 */
export default function () {
  const actionData = useActionData<typeof action>()

  return (
    <main className="flex justify-center items-center h-screen relative">
      <Message 
        autoClose={2000}
        success={actionData?.success}
        error={actionData?.error}
        fields={[
          {name: 'email', value: actionData?.data.email}
        ]}
      />

      <div className="grid gap-6 px-4 w-full md:w-[400px]">
        <Logo alt="IHDI Logo" />
        <Title>Esqueceu a senha?</Title>

        <Form method="POST" key={actionData?.data.email ?? 'new'}  className="grid gap-4">
          <Input 
            label="E-mail"
            type="email"
            name="email"
            defaultValue={actionData?.data.email}
          />
          <Button>Solicitar nova senha</Button>
        </Form>

        <Link 
          to="/login"
          className="
            justify-self-center
            text-blue-500
            hover:underline
          "
        >
          Voltar para Login
        </Link>
      </div>
    </main>
  );
}