import styled from "styled-components";
import { MASK_HEIGHT, MASK_WIDTH } from "../consts";

export const MaskWrapper = styled.div`
  width: ${MASK_WIDTH}px;
  height: ${MASK_HEIGHT}px;
  position: relative;
  
  img {
    width: ${MASK_WIDTH}px;
    height: ${MASK_HEIGHT}px;
  }
`;
