import styled from 'styled-components';

const Tutorial = styled.div`
  .pageLeft{
    float: left;
    width: 150px;
    padding-right: 10px;
  }

  .pageRight{
    float: left;
    width: calc(100% - 150px);
  }
`;

export default Tutorial;
