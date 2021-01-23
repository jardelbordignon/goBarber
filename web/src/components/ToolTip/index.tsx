import React from 'react'
import { ToolTipContainer } from './styles'

interface Props {
  title: string
  className?: string
}


const ToolTip: React.FC<Props> = ({ title, className, children}) => {
  
  return (
    <ToolTipContainer className={className}>
      { children }
      <span>{ title }</span>
    </ToolTipContainer>
  )
}

export default ToolTip