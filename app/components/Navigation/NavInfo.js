import styled from 'styled-components';

const NavInfo = styled.div`
  float: left;
  width: 150px;
  text-align: right;
  
  .address{
    font-weight: 700;
    font-size: 14px;
    padding: 2px;
    cursor: pointer;
  }
  
  /* .address:hover{
    background-color: #BBB;
    border-radius: 4px;
  } */
  
  .balance{
    font-size 12px;
    letter-spacing: -0.5px;
  }
  
  span{
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0px;
    color: #57A6D9;
    padding-right: 5px;
  }
`;

export default NavInfo;
