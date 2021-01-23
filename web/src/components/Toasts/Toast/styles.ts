import styled, { css } from 'styled-components'
import { animated } from 'react-spring'

interface ToastProps {
  type?: 'success' | 'error' | 'info'
  hasNoDescription?: boolean
}

const toastVariations = {
  success: css `
    background-color: #e6fffa;
    color: #2e656a;
  `,
  error: css `
    background-color: #fddede;
    color: #c53030;
  `,
  info: css `
    background-color: #ebf8ff;
    color: #3172b7;
  `
}

export const ToastContainer = styled(animated.div)<ToastProps> `
  position: relative;
  width: 360px;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  & + div { margin-top: 8px; }

  ${props => toastVariations[props.type || 'info']}

  ${props => props.hasNoDescription && css `
    align-items: center;
    svg { margin-top: 0; }
  `}
`
