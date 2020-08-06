/**
 *
 * IdeJavascript
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function IdeJavascript() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

IdeJavascript.propTypes = {};

export default IdeJavascript;
