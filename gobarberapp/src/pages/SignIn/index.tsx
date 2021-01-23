import React, { useCallback, useRef } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import { useAuthContext } from '../../hooks/AuthContext'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'
import { SignInContainer, Title, ButtonForgotPassword, ButtonForgotPasswordText, ButtonCreateAccount, ButtonCreateAccountText } from './styles'

interface CredentialsProps {
  email: string
  password: string
}
const SignIn: React.FC = () => {
  const navigation = useNavigation()

  const { signIn, user } = useAuthContext()
  
  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const submitHandler = useCallback( async(data: CredentialsProps) => {
    try {
      formRef.current?.setErrors({})
      
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha é obrigaória')
      })

      await schema.validate(data, { abortEarly: false })

      await signIn({
        email: data.email,
        password: data.password
      })

      console.log(user)

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        
        return
      }

      Alert.alert('Erro na autenticação', 'Erro ao efetuar o login, cheque as credenciais')
    }  
  }, [signIn])

  return (
  <>
    <KeyboardAvoidingView style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>

      <ScrollView
        keyboardShouldPersistTaps='handled' 
        contentContainerStyle={{flex: 1}}>
        <SignInContainer>
          <Image source={logoImg} />
          <Title>Faça seu login</Title>

          <Form onSubmit={submitHandler} ref={formRef} style={{width: '100%'}}>
            <Input name='email'
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='E-mail' 
              icon='mail'
              returnKeyType='next'
              onSubmitEditing={() => {passwordInputRef.current?.focus()}} />
            <Input name='password'
              ref={passwordInputRef}
              autoCapitalize='none'
              placeholder='Senha' 
              icon='lock'
              secureTextEntry
              returnKeyType='send'
              onSubmitEditing={() => formRef.current?.submitForm()} />
            <Button onPress={() => formRef.current?.submitForm()}> Entar </Button>
          </Form>

          <ButtonForgotPassword onPress={() => {}}>
            <ButtonForgotPasswordText>Esqueci minha senha</ButtonForgotPasswordText>
          </ButtonForgotPassword>
        </SignInContainer>
      </ScrollView>
    </KeyboardAvoidingView>

    <ButtonCreateAccount onPress={() => navigation.navigate('SignUp')}>
      <Icon name='log-in' size={20} color='#ff9000' />
      <ButtonCreateAccountText>Criar uma conta</ButtonCreateAccountText>
    </ButtonCreateAccount>
  </>
)}

export default SignIn