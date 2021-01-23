import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../../services/api'

interface AuthStateProps {
  token: string
  user: Object
}

export interface CredentialsProps {
  email: string
  password: string
}

interface AuthContextProps {
  user: Object
  signIn(credentials: CredentialsProps): Promise<void>
  signOut(): void
}


const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)


export const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthStateProps>(() => {  
    const token = localStorage.getItem('@GoBarber:token')
    const user  = localStorage.getItem('@GoBarber:user')

    if (token && user)
      return {token, user: JSON.parse(user)}
    
    return {} as AuthStateProps
  })

  const signIn = useCallback( async ({ email, password }) => {
    const res = await api.post('sessions', { email, password })
    //console.log(res.data);
    const { token, user } = res.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    setData({token, user})
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')

    setData({} as AuthStateProps)
  }, [])

  return (
    <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
      { children }
    </AuthContext.Provider>
  )
}


export function useAuthContext(): AuthContextProps {
  const authContext = useContext(AuthContext)

  if (!authContext)
    throw new Error('useAuthContext precisa estar dentro de um contexto AuthProvider')
  
  return authContext
}