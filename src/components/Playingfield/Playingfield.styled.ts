import styled from "styled-components";
import { PLAYINGFIELD_HEIGHT, PLAYINGFIELD_WIDTH } from "../consts";

export const PlayingfieldWrapper = styled.div`
  position: relative;
  height: ${PLAYINGFIELD_HEIGHT}px;
  width: ${PLAYINGFIELD_WIDTH}px;
  contain: strict;
`;
