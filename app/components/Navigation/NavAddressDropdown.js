import styled from 'styled-components';

const NavAddressDropdown = styled.div`
  position: fixed;
  top: 70px;
  right: 0px;
  width: 226px;
  max-height: 450px;
  overflow-y: scroll;
  background-color: #EEE;
  z-index: 995;
  -webkit-box-shadow: 0px 3px 23px -10px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 3px 23px -10px rgba(0,0,0,0.25);
  box-shadow: 0px 3px 23px -10px rgba(0,0,0,0.25);
  
  .dropdownEntry{
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .dropdownEntryAddress{
    font-weight: 700;
    font-size: 14px;
    padding: 2px;
    cursor: pointer;
  }
    
  .dropdownEntry:hover{
    background-color: #a8dadc;
  }
  
  .dropdownEntryIcon{
    float: left;
    min-width: 50px;
    min-height: 30px;
    padding-right: 10px;
  }
  
  .dropdownEntryIcon img{
    margin-top: 5px;
  }
  
  .dropdownEntryInfo{
    float: left;
  }
  
  .dropdownEntryBalance{
    font-size 12px;
    letter-spacing: -0.5px;
    color: #666;
  }
  
  .dropdownEntryBalance span{
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0px;
    padding-right: 5px;
  }
`;

export default NavAddressDropdown;
