import { styled } from 'styled-components'

const Header = styled.h3`
  text-decoration: underline;
  margin: 0;
`

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const PageTitle = ({
  children,
  ...restProps
}: PageTitleProps): JSX.Element => <Header {...restProps}>{children}</Header>
