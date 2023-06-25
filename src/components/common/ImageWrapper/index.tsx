import imageWrapperStyles from './image-wrapper.module.css'

export function ImageWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative bg-transparent rounded-[4px] w-full drop-shadow-1 overflow-hidden -z-0">
      <div className={imageWrapperStyles.box}>
        <div className="bg-gra-20 p-[10px]">{children}</div>
      </div>
    </div>
  )
}
