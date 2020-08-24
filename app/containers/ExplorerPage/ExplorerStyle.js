import styled from 'styled-components';

const ExplorerStyle = styled.div`
  padding: 20px 30px;
  
  .pageLeft{
    float: left;
    width: 200px;
    background-color: #000;
    color: #FFF;
  }
  
  .pageRight{
    float: left;
    width: calc(100% - 200px)
  }
  
  .contractAddress{
    font-size: 12px;
    background-color: #040404;
    color: #999;
    padding: 20px;
  }
  
  .contractAddressTitle{
    float: left;
    padding-right: 20px;
  }
  
  .contractAddressContent{
    float: left;
    font-weight: 700;
    color: white;
  }
  
  .CodeMirror{
    padding: 10px;
    
    min-height: 400px;
    max-height: 400px;
  }
  
  .ide{
    min-height: 400px;
    max-height: 400px;
  }
  
  .actionPanel{
    height: 50px;
    background-color: #111;
    padding: 0px 10px;
  }
  
  .actionPanelButton{
    float: left;
    margin: 5px;
  }
  
  .actionPanelBalance{
    float: right;
    margin: 5px;
  }
  
  .actionPanelBalance button{
    background-color: #DDD;
    color: #333;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    pointer-events: none;
    border-radius: 0px;
  }
  
  .bashConsole{
    height: 150px;
    background-color: #040404;
    color: #999;
    padding: 10px 20px;
    font-size: 12px;
    
    font-family: 'PT Serif', serif;
    overflow-y: scroll;
  }
  
  .bashConsoleLine{
    padding-bottom: 2px;
    line-height: 14px;
  }
  
  .bashConsoleLine:before{
    content: ">";
    padding-right: 10px;
  }
  
  
  .actionPanelButton button{
    background-color: #222;
    color: #CCC;
    padding: 5px 10px;
    font-size: 12px;
  }
  .actionPanelButton button:hover{
    background-color: #000;
  }
`;

export default ExplorerStyle;
