import { type ActionArgs, redirect, json } from "@remix-run/node"
import { Form, Link, useActionData } from "@remix-run/react"

import logo from '../images/logo.svg'
import { Message } from "~/components"

// Form data type
type FormData = {
  cleanMessage: string
  email: string
  password: string
}

/**
 * Action Function
 * @param param0 
 * @returns data object or redirect
 */
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { cleanMessage, email, password } = Object.fromEntries(formData) as FormData

  if (cleanMessage) {
    return json({
      error: '',
      success: '',
      data: {
        email,
        password
      }
    }, {
      status: 200
    })
  }

  if (!email || !password) {
    return json({
      error: 'As informações para login são necessárias',
      success: '',
      data: {
        email,
        password
      }
    }, {
      status: 400
    })
  }

  // TODO: Validar contra as informações vindas do banco de dados
  if (email !== 'email@email.com' || password !== '123456') {
    return json({
      error: 'E-mail ou senha inválidos',
      success: '',
      data: {
        email,
        password
      }
    }, {
      status: 401
    })
  }
  
  return redirect('/login');
};

/**
 * View
 * @returns JXS
 */
export default function Login() {
  const actionData = useActionData<typeof action>()

  return <main className="flex justify-center items-center h-screen relative">

    <Message 
      autoClose={2000}
      success={actionData?.success}
      error={actionData?.error}
      fields={[
        {name: 'email', value: actionData?.data.email},
        {name: 'password', value: actionData?.data.password}
      ]}
    />

    {/* Container com todos os elementos menos a mensagem de erro */}
    <div className="grid gap-6 px-4 w-full md:w-[400px]">
      
      {/* Logotipo */}
      <img 
        src={logo} 
        alt="IHDI Logo" 
        className="
          w-40
          md:w-auto
          justify-self-center
        "
      />

      {/* Título */}
      <h1 
        className="
          justify-self-center
          text-3xl
          font-bold
          text-center
        "
      >
        Processamento de Pagamentos
      </h1>

      {/* Formulário */}
      <Form method="POST" className="grid gap-4">

        {/* Campo de email */}
        <label className="grid font-bold">
          E-mail:
          <input 
            type="email" 
            name="email" 
            id="email"
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

        {/* Campo de senha */}
        <label className="grid font-bold">
          Senha:
          <input 
            type="password" 
            name="password" 
            id="password" 
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

        {/* Botão de envio do formulário */}
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

      {/* Link de esqueci minha senha */}
      <Link 
        to="/esqueci-senha"
        className="
          justify-self-center
          text-blue-500
          hover:underline
        "
      >
        Esqueci minha senha
      </Link>
        
    </div>
  </main>
}