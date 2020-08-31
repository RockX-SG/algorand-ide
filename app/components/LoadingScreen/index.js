/**
 *
 * LoadingScreen
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import PulseLoader from "react-spinners/PulseLoader";

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import LoadingStyle from './LoadingStyle';

function LoadingScreen(props) {
  const {
    loading
  } = props;
  
  return (
    <LoadingStyle>
      <div className={(loading) ? "loading" : "hide"}>
        <div className="loadSpinner">
          <PulseLoader
            size={30}
            color={"#fff"}
            loading={loading}
          />
          <div className="loadText">
            Loading
          </div>
        </div>
      </div>
    </LoadingStyle>
  );
}

LoadingScreen.propTypes = {};

export default LoadingScreen;
