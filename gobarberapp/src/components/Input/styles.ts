import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

interface StyleProps {
  isFocused: boolean
  isErrored: boolean
}

export const InputContainer = styled.View<StyleProps> `
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background-color: #232129;
  margin-bottom: 8px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${
    props => props.isFocused ? '#ff9000' 
    : (props.isErrored ? '#c53030': '#232129')
  };
  
  flex-direction: row;
  align-items: center;
`

export const TextInput = styled.TextInput `
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`

export const Icon = styled(FeatherIcon) `
  margin-right: 15px;
`