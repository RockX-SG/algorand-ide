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
  
  a{
    color: inherit;
    text-decoration: inherit;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  // p,
  // label {
  //   font-family: Georgia, Times, 'Times New Roman', serif;
  //   line-height: 1.5em;
  // }

  .page{
    max-width: 1200px;
    width: calc(100% - 70px);
    margin: auto;
    // padding: 0px 0px;
    overflow: auto;
    min-height: 700px;
    padding-top: 70px;
    padding-left: 70px;
  }
  
  .pagePadTop{
    padding-top: 130px;
  }
  
  .hide{
    display: none;
  }
  
  .clear{
    clear: both;
  }
  
  .pageName{
    // background-color: #023e8a;
    // color: white;
    border-bottom: 3px dotted #023e8a;
    color: #023e8a;
    padding: 10px 0px;
    display: inline-block;
    font-size: 14px;
    margin-bottom: 20px;
    // border-radius: 4px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
  }
  
  button{
    padding: 15px 25px;
    background-color: #57A6D9;
    border: none;
    margin: 8px 0px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover{
    background-color: #2a81ba;
  }
  
  button.error{
    background-color: #e63946 !important;
  }
  button.error:hover{
    background-color: #cb1927 !important;
  }
  
  button.mini{
    padding: 10px 20px;
    font-size: 14px;
    background-color: #023e8a;
  }
  
  button.complete{
    background-color: #AAA;
  }
  
  button.pending{
    background-color: #AAA;
    border: none;
  }
  
  .disabled{
    opacity: 0.5;
    pointer-events: none;
  }
  
  .selectComponent{
    font-size: 12px !important;
    text-transform: uppercase;
  }
`;

export default GlobalStyle;
