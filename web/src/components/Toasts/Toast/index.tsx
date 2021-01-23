import React, { useEffect } from 'react'
import { FiInfo, FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi'

import { ToastMessage, useToastContext } from '../../../hooks/appContext/ToastContext'
import { ToastContainer } from './styles'

interface ToastProps {
  message: ToastMessage
  style: object
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToastContext()

  useEffect(() => {
    const timer = setTimeout(() => {removeToast(message.id)}, 5000)
    return () => clearTimeout(timer)
  }, [message.id, removeToast])

  return(
    <ToastContainer 
      type={message.type} 
      hasNoDescription={!message.description}
      style={style}
    >

      { icons[message.type || 'info'] }

      <div>
        <strong>{ message.title }</strong>
        { message.description && <p>{message.description}</p> }
      </div>

      <button onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </ToastContainer>
  )
}

export default Toast