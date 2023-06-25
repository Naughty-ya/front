import gradientWrapperStyles from './gradient-wrapper.module.css'

export function GradientWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative bg-transparent rounded-[4px] w-full drop-shadow-1 overflow-hidden -z-0">
      <div className={gradientWrapperStyles.box}>
        <div className="bg-gra-20">{children}</div>
      </div>
    </div>
  )
}
