import type { ElementType, ReactNode } from 'react'
import { forwardRef } from 'react'

const directionMap = {
  row: 'flex-row',
  col: 'flex-col'
}

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline'
}

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
}

type Direction = keyof typeof directionMap
type Align = keyof typeof alignMap
type Justify = keyof typeof justifyMap

export interface FlexProps {
  as?: ElementType
  direction?: Direction
  align?: Align
  justify?: Justify
  children?: ReactNode
  className?: string
}

export const Flex = forwardRef<ElementType, FlexProps>((props, ref) => {
  const {
    as: Component = 'div',
    children,
    direction = 'row',
    align = 'start',
    justify = 'start',
    className,
    ...rest
  } = props

  return (
    <Component
      ref={ref}
      className={`flex ${directionMap[direction]} ${alignMap[align]} ${justifyMap[justify]} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
})
