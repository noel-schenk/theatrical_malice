import styled from 'styled-components'

import { PLAYINGFIELD_HEIGHT, PLAYINGFIELD_WIDTH } from '../consts'

export const PlayingfieldWrapper = styled.div`
  position: relative;
  height: ${PLAYINGFIELD_HEIGHT}px;
  width: ${PLAYINGFIELD_WIDTH}px;
  contain: strict;

  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='32' height='32' patternTransform='scale(16) rotate(45)'><rect x='0' y='0' width='100%' height='100%' fill='%23f6ad55ff'/><path d='M37.657 10.343l-4.243 4.243m-2.828 2.828l-4.243 4.243m11.314 0l-4.243-4.243m-2.828-2.828l-4.243-4.243m-20.686 0l-4.243 4.243m-2.828 2.828l-4.243 4.243m11.314 0l-4.243-4.243m-2.828-2.828l-4.243-4.243'  stroke-linejoin='round' stroke-linecap='round' stroke-width='7' stroke='%23f44336ff' fill='none'/><path d='M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8'  stroke-linejoin='round' stroke-linecap='round' stroke-width='7' stroke='%23ffffffff' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-880,0)' fill='url(%23a)'/></svg>");
`
