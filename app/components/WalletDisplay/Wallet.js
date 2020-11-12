import styled from 'styled-components';

const Wallet = styled.div`
  height: 60px;
  border: 1px solid #DDD;
  background-color: #EEE;
  border-radius: 4px;
  margin: 10px 0px;
  cursor: pointer;
  opacity: 0.8;
  
  :hover{
    opacity: 1;
  }
  
  .selected{
    float: left; 
    padding: 15px 20px;
    min-width: 72px;
    height: 32px;
  }

  .title{
    float: left; 
    padding: 15px 10px;
  }
  
  .titleIdent{
    font-size: 12px;
  }
  
  .titleAddress{
    font-weight: 700;
    font-size: 14px;
  }
  .titleAddressShorten{
    display: none;
    font-weight: 700;
    font-size: 14px;
  }
  
  .action{
    float: right;
    padding: 0px 20px;
  }
  
  .actionEntry{
    float: left;
    padding: 13px 10px;
    cursor: pointer;
  }
  
  .actionEntry:hover{
    background-color: #FFF;
  }
  
  .actionView{
  }
  
  .actionGenerate{
  }
  
  .actionRestore{
  }
  
  .popupContent{
    padding: 30px 40px;
  }
  
  .popupContentLeft{
    float: left;
  }
  
  .popupContentRight{
    float: right;
  }
  
  .popupContentCenter{
    margin: auto;
    text-align: center;
  }
  
  .popupTitle{
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 700;
  }
  
  .popupDescription{
    margin-bottom: 20px;
  }
  
  .mnemonic{
    font-size: 20px;
    border: 1px solid #888;
    padding: 30px 40px;
    background-color: #EEE;
  }
  
  @media (max-width: 768px) {
    .titleAddress{
      display: none;
    }
    .titleAddressShorten{
      display: block;
    }
  }
`;

export default Wallet;
