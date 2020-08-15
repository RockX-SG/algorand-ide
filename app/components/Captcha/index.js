/**
 *
 * Captcha
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import ReCAPTCHA from 'react-google-recaptcha';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const SITE_KEY = "6LcD4bQZAAAAACYkAz50vY5JnCUHYYux9HJpOL5n";
const SECRET_KEY = "6LcD4bQZAAAAAJ0IFLn-SYPOrbDQe7qsvC5Q0RQY";

function Captcha(props) {
  const {
    recaptchaRef,
    onRecaptchaChange
  } = props;
  
  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={SITE_KEY}
        onChange={onRecaptchaChange}
        onExpired={onRecaptchaChange}
        onErrored={onRecaptchaChange}
      />
    </div>
  );
}

Captcha.propTypes = {
  // input: React.PropTypes.object.isRequired
};

export default Captcha;