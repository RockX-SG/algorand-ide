/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import FooterStyles from './FooterStyles';

function Footer() {
  return (
    <FooterStyles>
      <div className="logoFooter">
      
      </div>
      <div className="footerText">
        <FormattedMessage {...messages.header} />
      </div>
    </FooterStyles>
  );
}

Footer.propTypes = {};

export default Footer;
