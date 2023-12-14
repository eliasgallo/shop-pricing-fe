import { styled } from 'styled-components'

export const Section = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
  display: grid;
  gap: 5px;
`

export const SectionTitle = styled.div`
  cursor: pointer;
  color: #24a0ed;
  min-width: 30%; // increase click size in case the name is short
`
type SectionProps = {
  section: string
  onSectionClick: (section: string) => void
  children: React.ReactNode
}

export const SectionComponent = ({
  section,
  onSectionClick,
  children,
}: SectionProps): JSX.Element => {
  return (
    <Section>
      <SectionTitle onClick={() => onSectionClick(section)}>
        {section} (+)
      </SectionTitle>
      {children}
    </Section>
  )
}
