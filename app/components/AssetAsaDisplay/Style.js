import styled from 'styled-components';

const Style = styled.div`
  .assetWrapper{
    max-height: 400px;
    overflow-y: scroll;
  }
  
  .assetCount{
    font-weight: bold;
    padding: 15px 0px;
  }
  
  .asset{
    float: left;
    width: calc(33% - 10px);
    padding: 10px 20px;
    background-color: #EEE;
    margin: 5px;
    padding-bottom: 20px;
  }
  
  .assetId{
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    border: 2px solid #666;
    padding: 10px;
    margin: 10px 0px;
  }
  
  .assetName{
    font-weight: bold;
  }
  
  .assetTotal{
    color: #666;
  }
  
  .assetUrl{
    font-size: 11px;
  }
`;

export default Style;
