import type { FC } from 'react'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import { ConfettiWrapper } from './Confetti.styled'

interface ConfettiProps {}

const Confetti: FC<ConfettiProps> = () => {
  const { width, height } = useWindowSize()
  return (
    <ConfettiWrapper>
      <ReactConfetti width={width} height={height} />
    </ConfettiWrapper>
  )
}

export default Confetti
