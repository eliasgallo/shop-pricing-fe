import styled, { keyframes } from 'styled-components'

const SpinnerKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerView = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${SpinnerKeyframe} 1s linear infinite;

  position: absolute;
  top: 40%;
  right: 50%;
`

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #777777dd;
  position: absolute;
  right: 0;
  top: 0;
`

export const Spinner = () => (
  <SpinnerWrapper>
    <SpinnerView />
  </SpinnerWrapper>
)
