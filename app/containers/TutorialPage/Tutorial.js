import styled from 'styled-components';

const Tutorial = styled.div`
  padding: 30px 40px;
  
  .tutorialEntry{
    float: left;
    width: calc(25% - 10px);
    padding: 30px;
    margin: 5px;
    height: 110px;
    background-color: #EEE;
    cursor: pointer;
  }
  
  .tutorialEntry:hover{
    background-color: #DDD;
  }
`;

export default Tutorial;
