import styled from 'styled-components';

const Nav = styled.div`
  position: fixed;
  background-color: #DDD;
  height: 70px;
  width: 100%;
  z-index: 999;
  border-bottom: 1px solid #AAA;

  .navLeft{
    float: left;
    padding: 15px 40px;
  }

  .navRight{
    float: right;
  }
  
  .navRightUser{
    float: left;
    background-color: #EEE;
    padding: 16px 0px;
    padding-right: 25px;
    padding-top: 17px;
  }
`;

export default Nav;
