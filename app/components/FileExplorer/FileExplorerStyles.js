import styled from 'styled-components';

const FileExplorerStyles = styled.div`
  font-size: 12px;
  padding-bottom: 20px;
  height: calc(600px + 53px);
  border-right: 1px solid #333;
  
  .header{
    padding: 20px 20px;
    padding-bottom: 0px;
  }
  
  .explorerBoundary{
    overflow-y: scroll;
    height: calc(554px + 53px);
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
    color: #DDD;
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
    font-weight: bold;
    color: white;
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
  
  .popupContent{
    padding: 30px 40px;
  }
  
  .popupContentTitle{
    color: black;
    padding-bottom: 20px;
    font-size: 16px;
  }
  
  .popupContentInput{
    margin-bottom: 20px;
  }
  
  .popupContentLeft{
    float: left;
    padding-bottom: 20px;
  }
  
  .popupContentRight{
    float: right;
    padding-bottom: 20px;
  }
`;

export default FileExplorerStyles;
