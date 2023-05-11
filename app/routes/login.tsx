import { useEffect, useRef } from "react"
import { type ActionArgs, redirect, json } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"

import logo from '../images/logo.svg'

// Form data type
type FormData = {
  cleanError: string
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
  const { cleanError, email, password } = Object.fromEntries(formData) as FormData

  // Utilizado para limpar os erros do formulário
  if (cleanError) {
    return json({
      error: '',
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
  const clearErrorRef = useRef<HTMLButtonElement | null>(null)
  const actionData = useActionData<typeof action>()

  useEffect(() => {
    const handler = setTimeout(() => {
      if (actionData?.error) {
        clearErrorRef.current?.click()
      }
    }, 3000);

    return () => clearTimeout(handler)
  }, [actionData?.error])

  return <main className="flex justify-center items-center h-screen relative">

    {/* Mensagem de erro */}
    <Form method="POST">
      <div 
        className={`
          flex
          justify-between
          items-baseline
          fixed
          bg-red-300
          w-full
          left-0
          p-2
          md:p-3
          border-t-2
          border-red-600
          text-red-800
          font-bold
          text-md
          md:text-lg
          text-center
          transition-all
          duration-300
          ease-in-out

          ${actionData?.error 
            ? 'bottom-0 visible opacity-100' 
            : '-bottom-10 invisible opacity-0'
          }
        `}
      >
        <span className="inline-block text-center">{actionData?.error}</span>

        <button 
          ref={clearErrorRef} 
          name="cleanError" 
          value="true"
          className="
            self-start
            flex
            justify-center
            items-center
            w-6
            h-6
            p-1
            rounded-full
            hover:bg-red-900
            hover:text-red-300
          "
        >
          X
        </button>
        
        <input type="hidden" name="email" defaultValue={actionData?.data.email} />
        <input type="hidden" name="password" defaultValue={actionData?.data.password} />
      </div>
    </Form>


  {/* Container com todos os elementos menos a mensagem de erro */}
   <div className="grid gap-6 px-4">
      
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
            defaultValue={actionData?.data.email}
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
            defaultValue={actionData?.data.email}
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
}