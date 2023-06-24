import imageWrapperStyles from './image-wrapper.module.css'

export function ImageWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative bg-transparent rounded-[4px] w-full drop-shadow-[0_0_40px_#66229C] overflow-hidden -z-0">
      <div className={imageWrapperStyles.box}>
        <div className="bg-gradient-to-r from-[#FF55F8]/[.2] to-[#5B89FF]/[.2] p-[10px]">
          {children}
        </div>
      </div>
    </div>
  )
}
