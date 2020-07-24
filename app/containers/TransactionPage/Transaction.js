import styled from 'styled-components';

const Transaction = styled.div`
  padding: 30px 40px;
  
  .sectionGroup{
    background-color: #EEE;
    margin-bottom: 20px;
    padding: 20px 25px;
  }
  
  .section{
    padding: 15px 0px;
  }
  
  .sectionTitle{
    font-weight: 700;
    padding-bottom: 6px;
  }
  
  .sectionTitleSend{
    float: left;
  }
  
  .sectionTitleSendInfo{
    float: left;
  }
  
  .info img{
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-top: -4px;
  }
  
  .addRoute{
    float: right;
    margin-top: -4px;
    cursor: pointer;
  }
  
  .routeId{
    padding: 15px 25px;
    background-color: #CCC;
    border: 1px solid #BBB;
  }
  
  .route{
    
  }
  .routePath{
    padding: 10px 20px;
    background-color: #DDD;
    margin: 5px 0px;
  }
  .routeSender{
    float: left;
    width: 200px;
  }
  .routeReceiver{
    float: left;
    width: 200px;
  }
  .routeAmount{
    float: left;
    width: 100px;
  }
  .routeArrow{
    float: left;
    padding: 2px 10px;
    margin-top: 16px;
  }
  .routeStatus{
    float: right;
    width: 50px;
    text-align: right;
    margin-top: 10px;
  }
  
  .routeTitle{
    font-size 12px;
    padding-bottom: 5px;
    font-weight: 700;
  }
  
  
  .assetResponse{
    border-top: 1px solid #333;
    margin-top: 20px;
    padding-top: 20px;
  }
  
  .assetResponseSection{
    padding-bottom: 20px;
  }
  
  .assetResponseTitle{
    padding-bottom: 10px;
    font-weight: 700;
  }
  
  .assetResponseOutput{
    background-color: #EEE;
    padding: 10px 15px;
  }
`;

export default Transaction;
