import React, { useRef, useCallback } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'
import { SignUpContainer, Title, ButtonSignIn, ButtonSignInText } from './styles'

interface UserProps {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const submitHandler = useCallback( async(data: UserProps) => {
    try {
      formRef.current?.setErrors({})
      
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos')
      })

      await schema.validate(data, { abortEarly: false })

      await api.post('/users', data)
      
      Alert.alert(
        'Cadastro realizado com sucesso',
        'Você já pode fazer login!'
      )

      navigation.goBack()

    } catch (err) {
       if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        
        return
      }

      Alert.alert(
        'Erro no cadastro',
        'Erro ao efetuar o cadastro, tente novamente'
      )
    }  
  }, [])

  return(
  <>
    <KeyboardAvoidingView style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>

      <ScrollView
        keyboardShouldPersistTaps='handled' 
        contentContainerStyle={{flex: 1}}>
        <SignUpContainer>
          <Image source={logoImg} />
          <Title>Crie sua conta</Title>

          <Form onSubmit={submitHandler} ref={formRef} style={{width: '100%'}}>
            <Input name='name'
              placeholder='Nome'
              icon='user'
              autoCapitalize='words'
              returnKeyType='next'
              onSubmitEditing={() => {
                emailInputRef.current?.focus()
              }}
            />

            <Input name='email'
              placeholder='E-mail'
              icon='mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              returnKeyType='next'
              ref={emailInputRef}
              onSubmitEditing={() => {
                passwordInputRef.current?.focus()
              }}
            />

            <Input name='password'
              placeholder='Senha'
              icon='lock'
              secureTextEntry
              textContentType='newPassword'
              returnKeyType='send'
              onSubmitEditing={() => formRef.current?.submitForm()}
              ref={passwordInputRef}
            />
            <Button onPress={() => formRef.current?.submitForm()}>Entar</Button>
          </Form>

        </SignUpContainer>
      </ScrollView>
    </KeyboardAvoidingView>

    <ButtonSignIn onPress={() => navigation.goBack()}>
      <Icon name='arrow-left' size={20} color='#fff' />
      <ButtonSignInText>Login</ButtonSignInText>
    </ButtonSignIn>
  </>
)}

export default SignUp