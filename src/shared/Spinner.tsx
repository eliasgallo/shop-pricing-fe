import styled, { keyframes } from 'styled-components'

const SpinnerKeyframe = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

const SpinnerView = styled.div`
  box-sizing: border-box;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  position: absolute;
  top: 40%;
  animation: ${SpinnerKeyframe} 1s linear infinite;

  --diam: 40px;
  width: var(--diam);
  height: var(--diam);
  right: calc(50% - var(--diam) / 2);
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
