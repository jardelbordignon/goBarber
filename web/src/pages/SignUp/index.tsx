import React, { useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api';
import { useToastContext } from '../../hooks/appContext/ToastContext';
import logo from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { SignUpContainer, Content, AnimationContainer, Background } from './styles'

interface UserProps {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToastContext()
  const history = useHistory()

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

      history.push('/')

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Bem vindo ao GoBarber'
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
        description: 'Erro ao efetuar o cadastro, tente novamente'
      })
    }  
  }, [addToast, history])

  return (
    <SignUpContainer>
      <Background />
  
      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber' />
    
          <Form onSubmit={submitHandler} ref={formRef}>
            <h1>Faça seu cadastro</h1>
    
            <Input name='name' icon={FiUser} placeholder='Nome' />
            <Input name='email' icon={FiMail} placeholder='E-mail' />
            <Input name='password' icon={FiLock} placeholder='Senha' type='password' />
            <Button type='submit'>Cadastrar</Button>
          </Form>
    
          <Link to='/'>
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </SignUpContainer>
  )
}

export default SignUp