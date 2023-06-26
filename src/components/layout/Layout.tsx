import bg from 'src/assets/img/bg.webp'

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div
      className="bg-cover bg-center w-full flex-1 max-h-[1000px] max-w-[500px] overflow-auto flex items-center"
      style={{
        backgroundImage: `url(${bg})`
      }}
    >
      <div className="w-full py-10 m-auto">{children}</div>
    </div>
  )
}
