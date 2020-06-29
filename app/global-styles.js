import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    // font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-family: 'Overpass', sans-serif;
  }

  body.fontLoaded {
    // font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .page{
    max-width: 900px;
    margin: auto;
    padding: 0px 20px;
    overflow: auto;
    min-height: 700px;
    margin-top: 20px;
  }
  
  .hide{
    display: none;
  }
`;

export default GlobalStyle;
