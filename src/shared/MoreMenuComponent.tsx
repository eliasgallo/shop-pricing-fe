import styled from 'styled-components'
import { useState } from 'react'

const ShowMenuContainer = styled.div<{ $show: boolean }>`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  box-sizing: border-box;
  cursor: pointer;
  padding: 0 10px;
  background-color: #24a0ed;
  border: 2px solid black;
  border-radius: 5px;
  color: white;
`

const Menu = styled.div<{ $show: boolean }>`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  gap: 5px;
`

const Content = styled.div`
  display: block;
  color: black;
  padding: 0 10px;

  text-decoration: none;
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
      <ShowMenuContainer
        onClick={() => setShowMenu(!showMenu)}
        $show={!showMenu}
      >
        <span>⚙️ &#8226;&#8226;&#8226;</span>
      </ShowMenuContainer>
      <Menu $show={showMenu}>
        {options.map(({ title, handleOption }: Option) => (
          <Content
            onClick={handleOption}
            key={title}
          >
            <span>{title}</span>
          </Content>
        ))}
      </Menu>
    </>
  )
}
