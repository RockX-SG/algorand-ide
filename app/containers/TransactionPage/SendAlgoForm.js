import React from 'react';
import { Field, reduxForm } from 'redux-form';

import CreatableSelect from 'react-select/creatable';

// import ReCAPTCHA from "react-google-recaptcha";

import Captcha from '../../components/Captcha';

const recaptchaRef = React.createRef();

import Input from './Input';

let iconInfo = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA50lEQVRIid2UTQ6CMBSEv2jgehJQuZKIxyCu9R66lqi49AK4Fhe0hpCWPn5WTDJJ8zKdafvawtzhAzFwBHLgo5ir2lZpBiECCqBy8AmEfYyXwEFg3GYKLCQBQ8w1E5d5NMJcM7CZ+9Tn2TVZo0vzwtL4WLA6SUAFbLSw2RTr1gzGLqxMxbtgZVLmpoBSMLG9ExtLLRTd2wH4mgLeEwb8vZoB1wkDLqaA04QBZ1PRAx6Mb3JBxw8bOiZLaHwDTaQjzHcuc6j7sh9gntDz2ge4e1IpjfNYbPCoP64MuFG/0FKNM2CtNDPGD2oP1wWSIKFFAAAAAElFTkSuQmCC"/>

const SendAlgoForm = props => {
  const { 
    handleSubmit, 
    pristine, 
    reset, 
    submitting, 
    walletPage,
    address,
    balance,
    addressOption,
    onRecaptchaChange,
    captchaData,
    onChangeAddress,
    onChangeAmount
  } = props;
  
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="sectionGroup">
        <div className="section">
          <div className="sectionTitle">
            <div className="sectionTitleSend">
              Sending Address: 
            </div>
            <div className="info sectionTitleSendInfo" data-tip="Toggle address at the top right menu to change selected address" data-for="transaction">
              {iconInfo}
            </div>
            <div className="clear"></div>
          </div>
          <div>
            {walletPage.address}
          </div>
        </div>
        <div className="section">
          <div className="sectionTitle">
            Available ALGO:
          </div>
          <div>
            {walletPage.balance}
          </div>
        </div>
      </div>
      <div className="sectionGroup">
        <div className="section">
          <div className="sectionTitle">
            Destination Address:
          </div>
          <div className="selectComponent">
            <CreatableSelect
              isClearable
              onChange={onChangeAddress}
              defaultValue={addressOption[0]}
              options={addressOption}
            />
          </div>
        </div>
      </div>
      <div className="sectionGroup">
        <div className="section">
          <div className="sectionTitle">
            Amount of ALGO to send:
          </div>
          <div>
            <Input
              id="amount"
              type="text"
              placeholder="Please input sending amount"
              value={walletPage.inputAmount}
              onChange={onChangeAmount}
            />
          </div>
        </div>
      </div>
      <div className="section">
        <div>
          <Captcha recaptchaRef={recaptchaRef} onRecaptchaChange={onRecaptchaChange} />
        </div>
        <button>
          Send
        </button>
      </div>
    </form>
    
  );
};
// <div>
//   <Field name='captcharesponse' recaptchaRef={recaptchaRef} component={Captcha}/>
// </div>

export default reduxForm({
  form: 'sendAlgo', // a unique identifier for this form
})(SendAlgoForm);
