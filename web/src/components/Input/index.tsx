import React, { InputHTMLAttributes, useRef, useEffect, useState, useCallback } from 'react'

import { InputContainer, ErrorContainer } from './styles'
import { IconBaseProps } from 'react-icons/lib'
import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string // tranformando o name em obrigatório
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<Props> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const onFocusHandler = useCallback(() => {
    setIsFocused(true)
  }, [])
  
  const onBlurHandler = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <InputContainer isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      { error && 
      <ErrorContainer title={error}>
        <FiAlertCircle color='#c53030' size={20} />
      </ErrorContainer>
      }
    </InputContainer>
  )
}

export default Input