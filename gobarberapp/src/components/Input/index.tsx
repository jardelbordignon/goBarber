import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import { TextInputProps } from 'react-native' 
import { useField } from '@unform/core'

import { InputContainer, TextInput, Icon } from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

interface InputValueReference {
  value: string
}

interface InputRef {
  focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, ...rest}, ref) => {
  const inputElementRef = useRef<any>(null)
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled]   = useState(false)

  const inputFocusHandler = useCallback(() => setIsFocused(true), [])
  const inputBlurHandler = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputValueRef.current.value)
  }, [])

  // passar valor para um componente pai
  useImperativeHandle(ref, () => ({
    focus(){ inputElementRef.current.focus() }
  }))
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      }
    })
  }, [fieldName, registerField])

  return (
    <InputContainer isFocused={isFocused} isErrored={!!error}>

      <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666'} />
      <TextInput
        {...rest}
        ref={inputElementRef}
        keyboardAppearance='dark'
        placeholderTextColor='#666'
        defaultValue={defaultValue}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
        onChangeText={ value => inputValueRef.current.value = value } />
    </InputContainer>
)}

export default forwardRef(Input)