import type { ComponentPropsWithoutRef } from 'react'
import type { IconName } from 'src/components/core/Icon/icon-map'

import { forwardRef } from 'react'
import { iconMap } from 'src/components/core/Icon/icon-map'

interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  name: IconName
  size?: number
}

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const {
    name,
    size = 24,
    fill = 'currentColor',
    stroke = 'currentColor',
    ...rest
  } = props
  const IconComponent = iconMap[name]

  return (
    <IconComponent
      ref={ref}
      width={size}
      height={size}
      fill={fill}
      stroke={stroke}
      {...rest}
    />
  )
})
