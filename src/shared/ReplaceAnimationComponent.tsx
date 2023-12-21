import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const ANIMATION_DURATION_MS = 200 as const
const slideRightOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`

const slideLeftIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const ChildContainer = styled.div<{ $slideOut: boolean }>`
  animation: ${(props) => (props.$slideOut ? slideRightOut : 'none')}
    ${ANIMATION_DURATION_MS + 2}ms ease-in-out;
`

const ReplaceChildContainer = styled.div<{ $slideIn: boolean }>`
  animation: ${(props) => (props.$slideIn ? slideLeftIn : 'none')}
    ${ANIMATION_DURATION_MS}ms ease-in-out;
`

type ReplaceAnimationProps = {
  childNode: React.ReactNode
  replaceChildNode: React.ReactNode
  replaceTrigger: boolean
}

export const ReplaceAnimationComponent = ({
  childNode,
  replaceChildNode,
  replaceTrigger,
}: ReplaceAnimationProps): JSX.Element => {
  const [showButtonX, setShowButtonX] = useState({
    hideAnimation: false,
    hidden: false,
  })
  const [showButtonsYZ, setShowButtonsYZ] = useState(false)

  if (!(showButtonX.hidden || showButtonX.hideAnimation) && replaceTrigger) {
    setShowButtonX({ hideAnimation: true, hidden: false })
    setTimeout(() => {
      setShowButtonX({ hideAnimation: false, hidden: true })
      setShowButtonsYZ(true)
    }, ANIMATION_DURATION_MS)
  }

  return (
    <>
      {!showButtonX.hidden && (
        <ChildContainer $slideOut={showButtonX.hideAnimation}>
          {childNode}
        </ChildContainer>
      )}
      {showButtonsYZ && (
        <ReplaceChildContainer $slideIn={showButtonsYZ}>
          {replaceChildNode}
        </ReplaceChildContainer>
      )}
    </>
  )
}
