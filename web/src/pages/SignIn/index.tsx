import React, { useRef, useCallback } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { useAuthContext, CredentialsProps } from '../../hooks/appContext/AuthContext'
import { useToastContext } from '../../hooks/appContext/ToastContext'
import getValidationErrors from '../../utils/getValidationErrors'

import Button from '../../components/Button'
import Input from '../../components/Input'

import logo from '../../assets/logo.svg'
import { SignInContainer, Content, AnimationContainer, Background } from './styles'


const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuthContext()
  const { addToast } = useToastContext()
  
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

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        
        return
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Erro ao efetuar o login, cheque as credenciais'
      })
    }  
  }, [signIn, addToast])
  
  return (
  <SignInContainer>
    <Content>
      <AnimationContainer>
        <img src={logo} alt='GoBarber' />

        <Form onSubmit={submitHandler} ref={formRef}>
          <h1>Faça seu logon</h1>

          <Input name='email' icon={FiMail} placeholder='E-mail' />
          <Input name='password' icon={FiLock} type='password' placeholder='Senha' />
          <Button type='submit'>Entrar</Button>
          
          <Link to='/forgot'>Esqueci minha senha</Link>
        </Form>

        <Link to='/signup'>
          <FiLogIn />
          Criar conta
        </Link>
      </AnimationContainer>
    </Content>

    <Background />
  </SignInContainer>
)}

export default SignIn