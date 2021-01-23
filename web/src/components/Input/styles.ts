import styled, { css } from 'styled-components'
import ToolTip from '../ToolTip'

interface InputContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const InputContainer = styled.div<InputContainerProps> `
  background-color: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%; 
  color: #666360;

  display: flex;
  align-items: center;

  & + div { margin-top: 10px; }

  ${props => props.isErrored && css `
    border-color: #c53030;
  `}

  ${props => props.isFocused && css `
    color: #ff9000;
    border-color: #ff9000;
  `}

  ${props => props.isFilled && css `
    color: #ff9000;
  `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder { color: #666360; }
  }
 
  svg {
    margin-right: 15px;
  }
`

export const ErrorContainer = styled(ToolTip) `
  height: 20px;
  margin-left: 15px;

  svg { margin: 0; }

  span {
    background-color: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`