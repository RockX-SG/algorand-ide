import styled from 'styled-components';

const Transaction = styled.div`
  padding: 30px 40px;
  
  .sectionGroup{
    background-color: #FFF;
    margin-bottom: 20px;
    padding: 20px 25px;
  }
  
  .section{
    padding: 15px 0px;
  }
  
  .sectionStep{
    font-size: 11px;
    padding: 10px 15px;
    /* margin-bottom: 5px; */
    background-color: #abd2eb;
    display: inline-block;
    /* color: white; */
    border-radius: 2px;
    text-transform: uppercase;
    font-weight: 900;
  }
  
  .sectionStepContent{
    padding: 15px 25px;
    background-color: #EEE;
    margin-bottom: 25px;
    padding-top: 25px;
  }
  
  .sectionDisclaimer{
    font-size: 11px;
    font-weight: 300;
    font-style: italic;
    padding: 15px 10px;
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
    margin: 5px 0px;
  }
  .routeReceiver{
    float: left;
    width: 200px;
    margin: 5px 0px;
  }
  .routeAssetType{
    float: left;
    width: 130px;
    margin: 5px 0px;
  }
  .routeAmount{
    float: left;
    width: 100px;
    margin: 5px 0px;
  }
  .routeArrow{
    float: left;
    padding: 2px 10px;
    margin-top: 21px;
  }
  .routeStatus{
    float: right;
    width: 50px;
    text-align: right;
    margin-top: 10px;
  }
  
  .assetType{
    text-transform: uppercase;
  }
  
  .routeTitle{
    font-size 12px;
    padding-bottom: 5px;
    font-weight: 700;
  }
  
  .routeTitleText{
    float: left;
    padding-right: 5px;
  }
  
  .routeTitleIcon{
    float: left;
    cursor: pointer;
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
