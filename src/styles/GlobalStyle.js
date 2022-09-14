import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  input,
  textarea {
    user-select: auto;
  }
  input:focus,textarea:focus {
    outline: none;
  }
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  pre {
    background-color:#f5f5f5;
    padding:20px;
    overflow-x:scroll
  }
`

export default GlobalStyle
