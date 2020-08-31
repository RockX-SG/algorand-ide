/**
 *
 * BashConsole
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function BashConsole(props) {
  const {
    bashResponse
  } = props;
  
  let renderedBash = bashResponse.map((resp, index) =>
    <div key={index}>
      <div className="bashConsoleLine">
        {resp}
      </div>
    </div>
  );
    
  return (
    <div className="bashConsole">
      {renderedBash}
    </div>
  );
}

BashConsole.propTypes = {
  bashResponse: PropTypes.array
};

export default BashConsole;
