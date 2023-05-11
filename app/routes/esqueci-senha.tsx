import { Form, Link, useActionData } from '@remix-run/react';
import { type ActionArgs, redirect, json } from "@remix-run/node"

import logo from '../images/logo.svg'
import { useEffect, useRef } from 'react';

// Form data type
type FormData = {
  cleanError: string
  email: string
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { cleanError, email } = Object.fromEntries(formData) as FormData
  
  // Utilizado para limpar os erros do formulário
  if (cleanError) {
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
        email,
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

export default function () {
  const clearMessageButtonRef = useRef<HTMLButtonElement | null>(null)
  const actionData = useActionData<typeof action>()
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (actionData?.success || actionData?.error) {
        clearMessageButtonRef.current?.click()
      }
    }, 3000);

    return () => clearTimeout(handler)
  }, [actionData?.success, actionData?.error])

  return (
    <main className="flex justify-center items-center h-screen relative">

      {/* Mensagem de erro */}
      <Form method="POST">
        <div 
          className={`
            flex
            justify-between
            items-baseline
            fixed
            w-full
            left-0
            p-2
            md:p-3
            border-t-2
            font-bold
            text-md
            md:text-lg
            text-center
            transition-all
            duration-300
            ease-in-out

            ${actionData?.success || actionData?.error ? 'bottom-0 visible opacity-100' : '-bottom-10 invisible opacity-0'}
            ${actionData?.success && 'bg-green-300 border-green-600 text-green-800'}
            ${actionData?.error && 'bg-red-300 border-red-600 text-red-800'}
          `}
        >
          <span className="inline-block text-center">{actionData?.success || actionData?.error}</span>

          <button 
            ref={clearMessageButtonRef} 
            name="cleanError" 
            value="true"
            className={`
              self-start
              flex
              justify-center
              items-center
              w-6
              h-6
              p-1
              rounded-full
              ${actionData?.success && 'hover:bg-green-900 hover:text-green-300'}
              ${actionData?.error && 'hover:bg-red-900 hover:text-red-300'}
            `}
          >
            X
          </button>
          
          <input type="hidden" name="email" defaultValue={actionData?.data.email} />
        </div>
      </Form>

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
          Esqueceu a senha?
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
            Solicitar nova senha
          </button>
        </Form>

        {/* Link de esqueci minha senha */}
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