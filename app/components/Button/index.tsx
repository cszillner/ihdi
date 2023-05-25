import { type ComponentPropsWithoutRef } from "react"

type ButtonProps = ComponentPropsWithoutRef<'button'>

export function Button(props: ButtonProps) {
  return (
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
    "
      { ...props }
    >
      {props.children}
    </button>
  )
}