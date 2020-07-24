import styled from 'styled-components';

const RouteSignStyle = styled.div`
  .title{
    font-size 12px;
    padding-bottom: 5px;
    font-weight: 700;
  }
  
  .route{
    margin-bottom: 15px;
  }
  
  .routeContent{
    background-color: #DDD;
    padding: 10px 30px;
  }
  
  .routeContentPath{
    float: left;
    padding: 15px 0px;
  }
  
  .routeSign{
    float: right;
  }
  
  .routeSignature{
    background-color: #333;
    padding: 10px 30px;
    color: #EEE;
  }
  
  .routeSignature span{
    font-size: 12px;
    padding-right: 10px;
  }
`;

export default RouteSignStyle;
