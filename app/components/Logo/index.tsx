import logo from '../../images/logo.svg'

export function Logo() {
  return (
    <img 
      src={logo} 
      alt="IHDI Logo" 
      className="w-40 md:w-auto justify-self-center"
    /> 
  )
}