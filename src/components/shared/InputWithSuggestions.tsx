import { ChangeEvent, useState } from 'react'
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
  border: 1px solid #f3f3f3;
  background-color: white;
  max-height: 20rem;
  width: 100%;
  height: fit-content;
  position: absolute;
  /* z-index: 10; */
  visibility: ${(props) => (props.$show ? 'visible' : 'hidden')};
`

const Suggestion = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f3f3f3;
  }
`

type InputWithSuggestions = {
  suggestions: string[]
  currentValue: string
  onChange: (value: string) => void
  inputPlaceholder: string
}

export const InputWithSuggestions = ({
  suggestions,
  currentValue,
  onChange,
  inputPlaceholder,
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
        name='inputValue'
        placeholder={inputPlaceholder}
        value={currentValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        type='text'
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
