/**
 *
 * CustomNetworkDisclaimer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import DisclaimerStyles from './DisclaimerStyles';

function CustomNetworkDisclaimer(props) {
  const {
    network
  } = props;
  
  return (
    <DisclaimerStyles className={(network == "custom") ? "" : "hide"}>
      <div>
        Take note that betanet is different from testnet
      </div>
    </DisclaimerStyles>
  );
}

CustomNetworkDisclaimer.propTypes = {};

export default CustomNetworkDisclaimer;
