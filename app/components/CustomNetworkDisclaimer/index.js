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
        Please enter your network configuration in the settings page.
      </div>
    </DisclaimerStyles>
  );
}

CustomNetworkDisclaimer.propTypes = {};

export default CustomNetworkDisclaimer;
