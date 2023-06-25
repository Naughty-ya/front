interface Props {
  value: boolean
  trueCase: JSX.Element | null
  falseCase: JSX.Element | null
}

export function BooleanCase({ value, trueCase, falseCase }: Props) {
  return value ? trueCase : falseCase
}
