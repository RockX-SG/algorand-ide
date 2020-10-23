/**
 *
 * BetaNetDisclaimer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import DisclaimerStyles from './DisclaimerStyles';

function BetaNetDisclaimer(props) {
  const {
    network
  } = props;
  
  return (
    <DisclaimerStyles className={(network == "betanet") ? "" : "hide"}>
      <div>
        BetaNet is where new protocol-level features are released for initial testing
      </div>
    </DisclaimerStyles>
  );
}

BetaNetDisclaimer.propTypes = {};

export default BetaNetDisclaimer;
