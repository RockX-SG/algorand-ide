import styled from 'styled-components';

const LoadingStyle = styled.div`
  .loading{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 999999;
  }
  
  .loadSpinner{
    text-align: center;
    margin-top: calc(30% - 50px);
  }
  
  .loadText{
    padding-top: 40px;
    text-align: center;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
`;

export default LoadingStyle;
