import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const SignInContainer = styled.View `
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'ios' ? 40 : 160}px; 
`

export const Title = styled.Text `
  font-family: 'Roboto-Medium';
  font-size: 24px;
  color: #f4ede8;
  margin: 60px 0 25px;
` 

export const ButtonForgotPassword = styled.TouchableOpacity `
  margin-top: 25px;
`
export const ButtonForgotPasswordText = styled.Text `
  color: #f4ede8;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`

export const ButtonCreateAccount = styled.TouchableOpacity `
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const ButtonCreateAccountText = styled.Text `
  font-family: 'Roboto-Regular';
  font-size: 16px;
  color: #ff9000;
  margin-left: 12px;
`