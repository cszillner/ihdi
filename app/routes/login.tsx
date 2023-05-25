import { Button, Input, Logo, Title } from '~/components'

export default function () {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="grid gap-6 px-4">        
        <Logo />        
        <Title>Processamento de Pagamentos</Title>

        <form className="grid gap-4">
          <Input label="E-mail:" type='email'/>
          <Input label="Senha:" type='password'/>
          <Button>Entrar</Button>
        </form>

        <a 
          href="#" 
          className="justify-self-center text-blue-500 hover:underline"
        >
          Esqueci a senha
        </a>
      </div>
    </main>
  )
}