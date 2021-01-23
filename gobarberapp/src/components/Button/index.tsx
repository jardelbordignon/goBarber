import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'

import { ButtonContainer, ButtonText } from './styles'

interface ButtonProps extends RectButtonProperties {
  children: string
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => 
  <ButtonContainer {...rest}>
    <ButtonText>{ children }</ButtonText>
  </ButtonContainer>

export default Button