import styled from 'styled-components'
import { shade } from 'polished'

export const ButtonContainer = styled.button `
  background-color: #ff9000;
  color: #232129;
  height: 56px;
  width: 100%;
  border: 0;
  border-radius: 10px;
  padding: 0 16px;
  font-weight: 500;
  margin-top: 20px;
  
  &:hover {
    background-color: ${shade(0.2, '#ff9000')}
  }
`