import React from 'react'
import { useTransition } from 'react-spring'

import { ToastMessage } from '../../hooks/appContext/ToastContext'
import { ToastsContainer } from './styles'
import Toast from './Toast'


interface MessagesProps {
  messages: ToastMessage[]
}

const Toasts: React.FC<MessagesProps> = ({messages}) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-110%', opacity: 0 },
      enter: { right: '0', opacity: 1 },
      leave: { right: '-110%', opacity: 0 }
    }
  )

  return (
    <ToastsContainer>
      { messagesWithTransitions.map(({ item, key, props }) => 
        <Toast key={key} message={item} style={props} />
      )}
    </ToastsContainer>
  )
}

export default Toasts