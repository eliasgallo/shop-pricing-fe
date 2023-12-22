import { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-components'

const Header = styled.h3`
  text-decoration: underline;
  margin: 0;
`

type PageTitleProps = ComponentPropsWithoutRef<'header'> & {
  children: React.ReactNode
}

export const PageTitle = ({
  children,
  ...restProps
}: PageTitleProps): JSX.Element => <Header {...restProps}>{children}</Header>
