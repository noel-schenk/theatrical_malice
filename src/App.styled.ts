import styled from "styled-components";

export const AppWrapper = styled.div`
  @layer base {
    button:not([disabled]),
    [role="button"]:not([disabled]) {
      cursor: pointer;
    }
  }
`;
