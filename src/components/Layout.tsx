import bg from 'src/assets/img/bg.webp'

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div
      className="bg-cover bg-center h-full max-h-[1000px] w-full max-w-[500px] overflow-scroll"
      style={{
        backgroundImage: `url(${bg})`
      }}
    >
      {children}
    </div>
  )
}
