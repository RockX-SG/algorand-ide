/**
 *
 * Footer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import FooterStyles from './FooterStyles';

function Footer() {
  return (
    <FooterStyles>
      <FormattedMessage {...messages.header} />
    </FooterStyles>
  );
}

Footer.propTypes = {};

export default Footer;
