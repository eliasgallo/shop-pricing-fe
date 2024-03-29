import { OverrideProps } from '@types'
import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
  position: relative;
`

const Input = styled.input`
  box-sizing: border-box;
  /* transition: 0.2s ease-in-out; */
  width: 100%;
  /* &:focus {
    transition: 0.2s ease-in-out;
  } */
`

const SuggestionsContainer = styled.div<{ $show: boolean }>`
  overflow-y: scroll;
  ${(props) => props.theme.buttonMixin};
  border: 1px solid #f3f3f3;
  max-height: 20rem;
  width: 100%;
  height: fit-content;
  position: absolute;
  visibility: ${(props) => (props.$show ? 'visible' : 'hidden')};
`

const Suggestion = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

type InputWithSuggestions = OverrideProps<
  ComponentPropsWithoutRef<'input'>,
  { onChange: (value: string) => void }
> & {
  suggestions: string[]
  currentValue: string
}

export const InputWithSuggestions = ({
  onChange,
  suggestions,
  currentValue,
  ...restProps
}: InputWithSuggestions): JSX.Element => {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleFocus = () => {
    setShowSuggestions(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }

  const filteredSuggestions: string[] = suggestions.filter(
    (s) => s.toLowerCase().indexOf(currentValue.toLowerCase()) != -1
  )

  return (
    <Container>
      <Input
        autoComplete='off'
        value={currentValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        type='text'
        {...restProps}
      />
      <SuggestionsContainer $show={showSuggestions}>
        {filteredSuggestions.map((suggestion: string) => (
          <Suggestion
            key={suggestion}
            onClick={() => onChange(suggestion)}
          >
            {suggestion}
          </Suggestion>
        ))}
      </SuggestionsContainer>
    </Container>
  )
}
