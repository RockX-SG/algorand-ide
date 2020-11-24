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
  
  .tutorialSectionLink{
    text-decoration: underline;
  }
  
  .InputSection{
    padding: 10px 0px;
  }
  
  .InputSectionTitle{
    font-weight: 700;
  }
  
  .miniCode .CodeMirror{
    height: 50px;
  }
  
  .highlight{
    padding: 1px 4px;
    background-color: #FFF;
    border: 1px solid #DDD;
  }
  
  li{
    padding: 5px 0px;
  }
`;

export default Tutorial;
