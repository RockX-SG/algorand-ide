/**
 *
 * MainnetDisclaimer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import DisclaimerStyles from './DisclaimerStyles';

function MainnetDisclaimer(props) {
  const {
    network
  } = props;
  
  return (
    <DisclaimerStyles className={(network == "mainnet") ? "" : "hide"}>
      <div>
        You may be at risk of loss of funds by using Algorand IDE in mainnet mode.
      </div>
    </DisclaimerStyles>
  );
}

MainnetDisclaimer.propTypes = {};

export default MainnetDisclaimer;
