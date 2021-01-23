import React from 'react'

import { AuthProvider } from './AuthContext'

const AppContext: React.FC = ({ children }) => (
  <AuthProvider>
    { children }
  </AuthProvider>
)

export default AppContext