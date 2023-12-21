import styled from 'styled-components'
import { useState } from 'react'
import { ReplaceAnimationComponent } from './ReplaceAnimationComponent'

const ShowMenuContainer = styled.span`
  cursor: pointer;
  padding: 2px 10px;
  background-color: #24a0ed;
  border: 2px solid black;
  border-radius: 5px;
  color: white;
`

const Menu = styled.div`
  display: flex;
  gap: 5px;
`

const Content = styled.span`
  color: black;
  padding: 0 10px;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 5px;
  &:hover {
    background-color: #00000033;
  }
`

type Option = { title: string; handleOption: () => void }
type MoreMenuProps = {
  options: Option[]
}
export const MoreMenuComponent = ({ options }: MoreMenuProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <ReplaceAnimationComponent
        childNode={
          <ShowMenuContainer onClick={() => setShowMenu(!showMenu)}>
            <span>⚙️ &#8226;&#8226;&#8226;</span>
          </ShowMenuContainer>
        }
        replaceChildNode={
          <Menu>
            {options.map(({ title, handleOption }: Option) => (
              <Content
                onClick={handleOption}
                key={title}
              >
                {title}
              </Content>
            ))}
          </Menu>
        }
        replaceTrigger={showMenu}
      />
    </>
  )
}
