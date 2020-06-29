import React from 'react';
import { Field, reduxForm } from 'redux-form';

import ReCAPTCHA from "react-google-recaptcha";

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const Captcha = (props) => (
  <div>
    <ReCAPTCHA
      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      onChange={props.input.onChange}
    />
    </div>
);

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting, faucetBalance } = props;
  return (
    <form onSubmit={handleSubmit}>
    
      <h2>
        Faucet
      </h2>
      <div>
        Faucet Address:
      </div>
      <div>
        core alone rain law scout guitar immense tag kit dice negative inject crew unfold acquire buzz notice scene outer leisure soccer treat family abstract sign
      </div>
      <div>
        CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM
      </div>
      <div>
        Available balance: {faucetBalance} ALGO
      </div>
      <div>
        <Field name='captcharesponse' component={Captcha}/>
      </div>
      <div>
        <button>
          Redeem from Faucet
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);
