import styled from 'styled-components'

export const AppWrapper = styled.div`
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='32' height='32' patternTransform='scale(1) rotate(45)'><rect x='0' y='0' width='100%' height='100%' fill='%23f6ad55ff'/><path d='M37.657 10.343l-4.243 4.243m-2.828 2.828l-4.243 4.243m11.314 0l-4.243-4.243m-2.828-2.828l-4.243-4.243m-20.686 0l-4.243 4.243m-2.828 2.828l-4.243 4.243m11.314 0l-4.243-4.243m-2.828-2.828l-4.243-4.243'  stroke-linejoin='round' stroke-linecap='round' stroke-width='4' stroke='%23f44336ff' fill='none'/><path d='M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8'  stroke-linejoin='round' stroke-linecap='round' stroke-width='4' stroke='%23ffffffff' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-55,-5)' fill='url(%23a)'/></svg>");

  @layer base {
    button:not([disabled]),
    [role='button']:not([disabled]) {
      cursor: pointer;
    }
  }
`
