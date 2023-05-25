type TitleProps = {
  children: React.ReactNode
}

export function Title(props: TitleProps) {
  return (
    <h1 className="text-3xl font-bold text-center">
      {props.children}
    </h1>
  )
}