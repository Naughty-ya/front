import type { ComponentPropsWithoutRef } from 'react'
import type { IconName } from 'src/components/core/Icon/icon-map'

import { forwardRef } from 'react'
import { Icon } from 'src/components/core/Icon'

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  iconName: IconName
  iconSize?: number
  iconFill?: string
  iconStroke?: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { iconName, iconFill, iconStroke, iconSize, className, ...rest } =
      props

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center border border-transparent focus:outline-none ${className}`}
        {...rest}
      >
        <Icon
          name={iconName}
          fill={iconFill}
          stroke={iconStroke}
          size={iconSize}
        />
      </button>
    )
  }
)
