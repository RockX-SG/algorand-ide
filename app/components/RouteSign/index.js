/**
 *
 * RouteSign
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import RouteSignStyle from './RouteSignStyle';

function RouteSign(props) {
  const {
    walletPage
  } = props;
  
  const path = walletPage.addressArray.map((address, index) =>
    <div key={address.toString()}>
      <div>
        <div className="route">
          <div className="title">
            Route {index + 1}:
          </div>
          <div className="routeContent">
            <div className="routeContentPath">
              sender > receiver > amount
            </div>
            <div className="routeSign">
              <button className="mini">
                Sign
              </button>
            </div>
            <div className="clear"></div>
          </div>
          <div className="routeSignature">
            <span>Signature: </span> xxx
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
  return (
    <RouteSignStyle>
      {path}
    </RouteSignStyle>
  );
}

RouteSign.propTypes = {};

export default RouteSign;
