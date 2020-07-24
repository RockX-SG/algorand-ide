import styled from 'styled-components';

const FileExplorerStyles = styled.div`
  font-size: 12px;
  padding-bottom: 20px;
  height: 600px;
  border-right: 1px solid #333;
  
  .header{
    padding: 20px 20px;
    padding-bottom: 0px;
  }
  
  .explorerBoundary{
    overflow-y: scroll;
    height: 554px;
    padding-bottom: 20px;
  }
  
  .title{
    float: left;
    font-size: 14px;
    padding-bottom: 10px;
  }
  
  .headerAction{
    float: right;
    cursor: pointer;
  }
  
  .entry{
    padding: 5px 0px;
    cursor: pointer;
  }
  
  
  .entry img{
    width: 10px;
  }
  
  .entry:hover{
    background-color: #333;
  }
  
  .entrySelected{
    background-color: #89c0e4 !important;
    color: #111;
  }
  
  .folder{
    padding-bottom: 3px;
    text-transform: capitalize;
  }
  
  .file{
    padding-left: 10px;
  }
  
  .fileName{
    float: left;
  }
  
  .fileDelete{
    float: right;
    margin-right: 10px;
    cursor: pointer;
  }
  
  .indent1{
    padding-left: 25px;
  }
  
  .indent2{
    padding-left: 40px;
  }
  
  .indent3{
    padding-left: 55px;
  }
`;

export default FileExplorerStyles;
