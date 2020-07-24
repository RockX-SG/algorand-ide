import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Faucet from './Faucet';

import CreatableSelect from 'react-select/creatable';

// import ReCAPTCHA from "react-google-recaptcha";

import Captcha from '../../components/Captcha';

const recaptchaRef = React.createRef();

// const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
// 
// const SITE_KEY = "6LcD4bQZAAAAACYkAz50vY5JnCUHYYux9HJpOL5n";
// const SECRET_KEY = "6LcD4bQZAAAAAJ0IFLn-SYPOrbDQe7qsvC5Q0RQY";
// 
// const Captcha = (props) => (
//   <div>
//     {props.meta.touched && props.meta.error}
//     <ReCAPTCHA
//       sitekey={SITE_KEY}
//       onChange={response => props.input.onChange(response)}
//     />
//     </div>
// );
// onChange={props.input.onChange}

const options = [
  { value: 'xxx', label: 'xxx' },
  { value: 'yyy', label: 'yyy' },
]

const FaucetForm = props => {
  const { 
    handleSubmit, 
    pristine, 
    reset, 
    submitting, 
    faucetBalance, 
    onChangeReceiverAddress,
    addressArray,
    onRecaptchaChange,
    captchaData
  } = props;
  
  
  let addressOption = [];
  
  addressOption = addressArray.map(populateOptions);
  
  function populateOptions(addr) {
    return {value: addr, label: addr};
  }
  
  
  
  return (
    <form onSubmit={handleSubmit}>
      <Faucet>
      
        <div className="pageName">
          Faucet
        </div>
        <div className="section">
          <div className="sectionTitle">
            Faucet Address:
          </div>
          <div className="hide">
            core alone rain law scout guitar immense tag kit dice negative inject crew unfold acquire buzz notice scene outer leisure soccer treat family abstract sign
          </div>
          <div className="sectionAddress">
            CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM
          </div>
        </div>
        <div className="section">
          <div className="sectionTitle">
            Receiver Address:
          </div>
          <div className="sectionAddress">
            <div className="selectComponent">
              <CreatableSelect
                isClearable
                onChange={onChangeReceiverAddress}
                defaultValue={addressOption[0]}
                options={addressOption}
              />
            </div>
          </div>
        </div>
        <div className="section">
          <div className="sectionTitle">
            Available balance: 
          </div>
          <div className="balance">
            <span>{faucetBalance}</span> ALGO
          </div>
        </div>
        <div>
          <Captcha recaptchaRef={recaptchaRef} onRecaptchaChange={onRecaptchaChange} />
        </div>
        <div className={(captchaData == null || captchaData == undefined || captchaData == "") ? "hide" : "hide"}>
          Please enter reCaptcha
        </div>
        <div>
          <button>
            Redeem from Faucet
          </button>
        </div>
      </Faucet>
    </form>
  );
};
// <div>
//   <Field name='captcharesponse' recaptchaRef={recaptchaRef} component={Captcha}/>
// </div>

export default reduxForm({
  form: 'faucet', // a unique identifier for this form
})(FaucetForm);
