import React from 'react'
import { useAuthContext } from '../hooks/appContext/AuthContext'
import { RouteProps as RoutePropsRRD, Route as RouteRRD, Redirect } from 'react-router-dom'

interface RouteProps extends RoutePropsRRD {
  isPrivate?: boolean
  component: React.ComponentType
}

// isPrivate / !!user
//      true / true  = OK
//      true / false = Redireciona para login 
//     false / true  = Redireciona para dashboard
//     false / false = OK

const Route: React.FC<RouteProps> = (
    { isPrivate = false, component: Component, ...rest } ) => {

  const { user } = useAuthContext()

  const allowAccess = isPrivate === !!user
      
  return <RouteRRD {...rest}  render={({location}) => (
    allowAccess 
    ? <Component /> 
    : <Redirect to={{
        pathname: !!user ? '/dashboard' : '/',
        state: {from: location} }} />
  )} />
}

export default Route