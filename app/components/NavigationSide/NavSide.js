import styled from 'styled-components';

const NavSide = styled.div`
  position: fixed;
  padding: 0px 0px;
  background-color: #EEE;
  width: 70px;
  height: 100%;
  padding-top: 70px;
  z-index: 900;
  
  .navSideEntry{
    cursor: pointer;
    padding: 15px 20px;
  }
  
  .navSideEntry:hover{
    background-color: #DDD;
  }
  
  .navSideEntrySelected{
    background-color: #abd2eb !important;
    border-right: 6px solid #89c0e4;
  }
`;

export default NavSide;
