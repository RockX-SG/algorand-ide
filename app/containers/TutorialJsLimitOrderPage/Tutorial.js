import styled from 'styled-components';

const Tutorial = styled.div`
  padding: 30px 40px;
  
  .pageLeft{
    float: left;
    width: 180px;
    padding-right: 20px;
  }

  .pageRight{
    float: left;
    width: calc(100% - 180px);
  }
  
  .tutorialSection{
    margin-bottom: 20px;
    padding: 15px 25px;
    background-color: #EEE;
  }
  
  .tutorialSectionTitle{
    font-weight: 700;
    font-size: 18px;
    padding-bottom: 5px;
  }
  
  .InputSection{
    padding: 10px 0px;
  }
  
  .InputSectionTitle{
    font-weight: 700;
  }
`;

export default Tutorial;
