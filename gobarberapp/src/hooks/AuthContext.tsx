import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

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

  const [data, setData] = useState<AuthStateProps>({} as AuthStateProps)

  useEffect(() => {
    async function loadStorageData() {
      const token = await AsyncStorage.getItem('@GoBarber:token')
      const user  = await AsyncStorage.getItem('@GoBarber:user')
      //const [token, user] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user'])

      if (token && user)
        setData({token, user}) 
    }

    loadStorageData()
  }, [])

  const signIn = useCallback( async ({ email, password }) => {
    const res = await api.post('sessions', { email, password })
    //console.log(res.data);
    const { token, user } = res.data

    // await AsyncStorage.setItem('@GoBarber:token', token)
    // await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))
    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ])

    setData({token, user})
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

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