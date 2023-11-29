import { styled } from 'styled-components'

export const FormContainer = styled.form`
  display: grid;
  gap: 20px;
  margin-right: auto;
  margin-left: auto;
  width: fit-content;
`

export const SelectorWrapper = styled.div`
  display: flex;
  select {
    flex-grow: 1;
    text-align: center;
    margin-left: 10px;
  }
`
