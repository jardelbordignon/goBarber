import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle `
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background-color: #312e38;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  a, button { 
    outline: 0;
    text-decoration: none;
    cursor: pointer;
    transition: 0.2s;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
`