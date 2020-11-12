/**
 *
 * RouteSign
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import RouteSignStyle from './RouteSignStyle';

function RouteSign(props) {
  const {
    walletPage,
    addressArray,
    transactionPage,
    onSignRoute
  } = props;
  
  const path = transactionPage.atomicTxn.map((address, index) =>
    <div key={"routeSign" + index}>
      <div>
        <div className="route">
          <div className="title">
            Route {index + 1}:
          </div>
          <div className="routeContent">
            <div className="routeContentPath">
              {(transactionPage.routeSenders[index][0]) ? transactionPage.routeSenders[index][0] : ""}
              {(transactionPage.routeSenders[index][1]) ? " > " + transactionPage.routeSenders[index][1] : ""}
              {(transactionPage.routeSenders[index][2]) ? " > " + transactionPage.routeSenders[index][2] : ""}
              {(transactionPage.routeSenders[index][3]) ? " > " + transactionPage.routeSenders[index][3] : ""}
              {(transactionPage.routeSenders[index][4]) ? " > " + transactionPage.routeSenders[index][4] : ""}
              {(transactionPage.routeSenders[index][5]) ? " > " + transactionPage.routeSenders[index][5] : ""}
            </div>
            <div className="routeSign">
              <button className="mini" onClick={() => onSignRoute(index)}>
                Sign
              </button>
            </div>
            <div className="clear"></div>
          </div>
          <div className="routeSignature">
            <span>Signature: </span> {transactionPage.atomicSignedTxn[index]}
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

RouteSign.propTypes = {
  addressArray: PropTypes.array
};

export default RouteSign;
