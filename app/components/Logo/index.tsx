import React, { type ComponentPropsWithRef } from 'react'

import logo from '../../images/logo.svg'

type LogoProps = ComponentPropsWithRef<'img'> & {
  size?: 'small' | 'normal' | 'large'
}
type LogoRef = React.Ref<HTMLImageElement>

const Logo = React.forwardRef(({ className, alt, size, ...props }: LogoProps, ref: LogoRef) => {
  return (
    <img 
      { ...props }
      src={logo} 
      alt={alt} 
      className={`
        justify-self-center
        ${size === 'small' && 'w-32 md:w-40'}
        ${size === 'normal' && 'w-40 md:w-48'}
        ${size === 'large' && 'w-48 md:w-56'}
        ${!size && 'w-40 md:w-auto'}
        ${className}
      `}
    />
  )
})

Logo.displayName = 'Logo'

export { Logo }