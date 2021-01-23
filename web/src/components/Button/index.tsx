import React, { ButtonHTMLAttributes } from 'react'

import { ButtonContainer } from './styles'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = ({ children, ...rest }) => (
  <ButtonContainer type='button' {...rest}>
    { children }
  </ButtonContainer>
)

export default Button