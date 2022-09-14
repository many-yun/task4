import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyle from 'styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/Theme'
import { IssueProvider } from 'context/GithubContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {/* <IssueProvider githubService={}> */}
    <App />
    {/* </IssueProvider> */}
  </ThemeProvider>,
)
