import type { ComponentPropsWithoutRef } from 'react'
import type { IconName } from 'src/components/core/Icon/icon-map'

import { forwardRef } from 'react'
import { Icon } from 'src/components/core/Icon'

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  iconName: IconName
  iconSize?: number
  iconColor?: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { iconName, iconColor, iconSize, className, ...rest } = props

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center focus:ring-2 focus:ring-offset-2 border border-transparent focus:outline-none ${className}`}
        {...rest}
      >
        <Icon name={iconName} color={iconColor} size={iconSize} />
      </button>
    )
  }
)
