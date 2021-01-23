import React, { createContext, useContext, useCallback, useState } from 'react'
import { v4 } from "uuid"

import Toasts from '../../components/Toasts';

export interface ToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

interface ToastContextProps {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps)


export const ToastProvider: React.FC = ({ children }) => {
  
  const [toastMessages, setToastMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback( ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
    const id = v4()
    const toastMessage = { id, type, title, description }
    
    setToastMessages(() => [...toastMessages, toastMessage])
  }, [toastMessages])

  const removeToast = useCallback((id: string) => {
    setToastMessages(messages => messages.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      { children }
      <Toasts messages={toastMessages} />
    </ToastContext.Provider>
  )
}

export function useToastContext(): ToastContextProps {
  const toastContext = useContext(ToastContext)

  if (!toastContext)
    throw new Error('useToastContext precisa estar dentro do contexto ToastProvider')

  return toastContext
}