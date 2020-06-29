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
        <button>
          Redeem from Faucet
        </button>
      </div>
      
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field name="sex" component="input" type="radio" value="male" />
            {' '}
            Male
          </label>
          <label>
            <Field name="sex" component="input" type="radio" value="female" />
            {' '}
            Female
          </label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div>
      <div>
        <Field name='captcharesponse' component={Captcha}/>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);
