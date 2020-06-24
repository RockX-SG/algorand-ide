import styled from 'styled-components';

const NavLogo = styled.div`
  float: left;
  width: 180px;
  padding-top: 5px;

  .flex-grow{
    -webkit-box-flex: 1;
    flex-grow: 1;
    width: 120px;
  }

  .svgLogo{
    float: left;
    width: 120px;
  }
  .logoText{
    float: left;
    padding-left: 10px;
    margin-top: 8px;
  }
`;

export default NavLogo;
