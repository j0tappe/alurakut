import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AlurakutStyles } from "../src/lib/AlurakutCommons";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    background-image: linear-gradient(to right top, #d16ba5, #cb86c4, #c3a0da, #c0b8e9, #c4cdf1, #bfcdef, #baceed, #b6ceea, #9abde1, #7dacd8, #5c9bce, #308bc5);
    }
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  ${AlurakutStyles}
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <title>emokut®</title>
          <link rel="icon" href="../logo-favicon.ico" />         
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
