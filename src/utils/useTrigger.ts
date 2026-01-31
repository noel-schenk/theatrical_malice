import { useMemo, useReducer } from 'react'

export const useTrigger = () => {
  const [key, dispatch] = useReducer(x => x + 1, 0)
  return useMemo(() => () => dispatch(), [key])
}
