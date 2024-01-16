import { styled } from 'styled-components'

const Wrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

type ListProps = { children: React.ReactNode }
export const ListWrapper = ({ children }: ListProps) => {
  return <Wrapper>{children}</Wrapper>
}
