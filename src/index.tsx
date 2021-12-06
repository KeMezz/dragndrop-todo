import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';
import { Helmet } from 'react-helmet';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"
      />
    </Helmet>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);