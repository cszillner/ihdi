import logo from '../images/logo.svg'

export default function () {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="grid gap-6 px-4">
        
        <img src={logo} alt="IHDI Logo" className="w-40 md:w-auto justify-self-center"/>
        
        <h1 className="text-3xl font-bold text-center">Processamento de Pagamentos</h1>

        <form className="grid gap-4">      
          <label className="grid font-bold">
            E-mail:
            <input type="email" className="
              px-4
              py-2
              border-2
              border-gray-300
              rounded
              outline-none
              font-normal
              text-lg
              hover:border-blue-500
              focus:border-blue-700
              transition-all
              duration-300
            "
            />
          </label>

          <label className="grid font-bold">
            Senha:
            <input type="password" className="
              px-4
              py-2
              border-2
              border-gray-300
              rounded
              outline-none
              font-normal
              text-lg
              hover:border-blue-500
              focus:border-blue-700
              transition-all
              duration-300
            "/>
          </label>

          <button className="
            px-4
            py-2
            outline-none
            border-2
            border-blue-500
            bg-blue-500
            rounded
            text-white
            hover:bg-blue-600
            active:bg-blue-700
            focus:bg-blue-700
            transition-all
            duration-300
          ">Entrar</button>
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