import React, { type ComponentPropsWithoutRef } from 'react'

type TitleProps = ComponentPropsWithoutRef<'h1'>
type TitleRef = React.Ref<HTMLHeadingElement>

const Title = React.forwardRef(({ className, ...props }: TitleProps, ref: TitleRef) => {
  return (
    <h1 
      ref={ref}
      className={`
        justify-self-center
        text-3xl
        font-bold
        text-center
        ${className}
      `}
      { ...props }
    >
    {props.children}
  </h1>
  )
})

Title.displayName = 'Title'

export { Title }