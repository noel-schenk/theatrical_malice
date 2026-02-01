import styled from 'styled-components'

export const AdvancedMaskWrapper = styled.div`
  position: absolute;
  transition: all 2s ease-in-out;
  will-change: transform;

  @keyframes headshake {
    0% {
      transform: translateX(0);
    }
    6.5% {
      transform: translateX(-6px) rotateY(-9deg);
    }
    18.5% {
      transform: translateX(5px) rotateY(7deg);
    }
    31.5% {
      transform: translateX(-3px) rotateY(-5deg);
    }
    43.5% {
      transform: translateX(2px) rotateY(3deg);
    }
    50% {
      transform: translateX(0);
    }
  }

  .headshake {
    animation: headshake 1s ease-in-out;
  }

  .found-transition {
    transition: all 0.5s ease-out;
    transform: scale(1) rotate(0deg) translateY(0px);
    opacity: 1;
    filter: blur(0px);
  }
  .found {
    /* transform: scale(3) rotate(15deg) translateY(-50px);
    opacity: 0;
    filter: blur(8px); */
  }

  @keyframes pulsate {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
  }

  .animate-pulsate {
    animation: pulsate 0.3s ease-in-out infinite;
  }
`
